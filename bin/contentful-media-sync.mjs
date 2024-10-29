import fs from "fs/promises"
import path from "path"
import { createHash } from "crypto"
import { parse } from "node-html-parser"
import { default as contentfulManagement } from "contentful-management"
import "dotenv/config"

const client = contentfulManagement.createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
})
const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID)
const environment = await space.getEnvironment(
  process.env.CONTENTFUL_ENVIRONMENT_ID
)

// Contentful に画像をアップロードし、アセットを作成する関数
async function createAsset(imageInfo, directory) {
  // 対象画像ファイル
  const fileName = path.basename(imageInfo.src)
  const relativePath = path.relative(directory, imageInfo.src)
  // directoryからの相対パスをハッシュ化してアセットのIDとして使用する
  const assetId = createHash("sha256").update(relativePath).digest("hex")

  // 登録済みか確認
  const assets = await environment
    .getAssets({
      "sys.id": assetId,
      // ハッシュを指定して画像ファイルの更新を検知する
      "fields.description": imageInfo.hash,
    })
    .catch((error) => console.error({ error }))
  if (assets.items.length > 0) {
    console.info(
      `更新がありませんでしたのでスキップします: ${relativePath} with hash: ${imageInfo.hash}`
    )
    return assets.items[0].sys.id
  }

  // 画像をアップロード
  const fd = await fs.open(imageInfo.src, "r")
  const upload = await environment
    .createUpload({
      file: await fd.readFile(),
    })
    .finally(() => fd.close())
    .catch((error) => console.error({ error }))

  // アセットデータ
  const rawData = {
    fields: {
      file: {
        ja: {
          // TODO: 適切なMIMEタイプに変更
          contentType: "image/png",
          fileName,
          uploadFrom: {
            sys: {
              type: "Link",
              linkType: "Upload",
              id: upload.sys.id,
            },
          },
        },
      },
      title: {
        ja: fileName,
      },
      description: {
        ja: imageInfo.hash,
      },
    },
  }

  // 同一ファイルパスでアップロード済みのアセットが存在するか確認
  const asset = await environment.getAsset(assetId).catch(() => null)
  if (asset) {
    console.info(
      `アセットを更新します: ${relativePath} with hash: ${imageInfo.hash} -> asset.sys.id: ${assetId}`
    )
    // アセットを更新
    console.log({ asset })
    asset.fields = {
      ...asset.fields,
      ...rawData.fields,
    }
    asset
      .update()
      .then((asset) => asset.processForAllLocales())
      .catch((error) => console.error({ error }))

    return asset.sys.id
  }

  // アセットを作成
  console.info(`アセットを作成します: ${relativePath}`)
  const newAsset = await environment
    .createAssetWithId(assetId, rawData)
    .then((asset) => asset.processForAllLocales())
    .catch((error) => console.error({ error }))

  return newAsset.sys.id
}

// ディレクトリ内のHTMLファイルを再帰的に取得する関数
async function findHtmlFiles(directory) {
  const htmlFiles = []

  const walk = async (dir) => {
    const dirents = await fs.readdir(dir, { withFileTypes: true })
    for await (const dirent of dirents) {
      const fullPath = path.join(dir, dirent.name)
      if (dirent.isDirectory()) {
        await walk(fullPath)
      } else if (path.extname(fullPath) === ".html") {
        htmlFiles.push(fullPath)
      }
    }
  }
  await walk(directory)

  return htmlFiles
}

// html ファイルを入力に img タグに指定されたローカル画像をContentfulに登録する関数
// 画像はハッシュ化して重複を除去
async function processHtmlFiles(htmlFiles, directory) {
  // 画像のコンテンツのハッシュと画像情報の対応表
  const imageInfoMap = new Map()

  for await (const htmlFile of htmlFiles) {
    const content = await fs.readFile(htmlFile, "utf8")
    const root = parse(content)
    const images = root.querySelectorAll("img")

    // 各imgタグの処理
    for (const img of images) {
      const src = img.getAttribute("src")
      const absoluteSrc = path.resolve(path.dirname(htmlFile), src)

      // 画像ファイルのコンテンツを取得してハッシュ化
      const imageContent = await fs.readFile(absoluteSrc)
      const hash = createHash("sha256").update(imageContent).digest("hex")
      const imageInfo = { src: absoluteSrc, hash }

      // アセット登録
      const key = `${absoluteSrc}:${hash}`
      if (!imageInfoMap.has(key)) {
        const assetId = await createAsset(imageInfo, directory)
        imageInfo.assetId = assetId

        // ファイルパスとファイル内容をキーにして、画像情報を管理
        imageInfoMap.set(key, imageInfo)
      }
      const fileUrl = await environment
        .getAsset(imageInfoMap.get(key).assetId)
        .then((asset) => asset.fields.file.ja.url)
        .catch((error) => console.error({ error }))

      // Pageモデルの登録がないためこの段階ではContentfulの配信URLに置換する仮実装
      img.setAttribute("src", fileUrl)
    }
    // 動作確認のため、出力（ファイル更新は行わない）
    console.log(root.toString())
  }
}

// 第一引数をディレクトリとして取得
const directory = process.argv[2]

if (!directory) {
  console.error("ディレクトリを指定してください。")
  process.exit(1)
}

// HTMLファイルのパスを取得
const htmlFiles = await findHtmlFiles(directory)

// 取得したHTMLファイルからimgタグに指定された画像情報を取得
await processHtmlFiles(htmlFiles, directory)
