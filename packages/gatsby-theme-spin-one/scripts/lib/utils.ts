import fs from 'fs/promises';
import path from 'path';
import { createHash } from 'crypto';
import type { Environment, Upload } from 'contentful-management';
import type { HTMLElement } from 'node-html-parser';
import mime from 'mime';

// 画像をアップロードする関数
const uploadImage = async (environment: Environment, src: string) => {
  const fd = await fs.open(src, 'r');
  const upload = await environment
    .createUpload({
      file: await fd.readFile(),
    })
    .finally(() => fd.close())
    .catch((error) => {
      console.error({ error });
      return undefined;
    });
  return upload;
};

// アセットを作成する関数
const createAsset = async (
  environment: Environment,
  assetId: string,
  fileName: string,
  contentType: string,
  upload: Upload,
) => {
  const asset = await environment.createAssetWithId(assetId, {
    fields: {
      title: {
        ja: fileName,
      },
      file: {
        ja: {
          fileName,
          contentType,
          uploadFrom: {
            sys: {
              type: 'Link',
              linkType: 'Upload',
              id: upload.sys.id,
            },
          },
        },
      },
    },
  });
  return asset;
};

// Contentful に画像をアップロードする関数
const createImageAsset = async (environment: Environment, imageInfo: ImageInfo, directory: string) => {
  // 対象画像ファイル
  const fileName = path.basename(imageInfo.src);

  const relativePath = path.relative(directory, imageInfo.src);
  const assetId = createHash('sha256').update(relativePath).digest('hex');

  // 登録済みか確認
  const assets = await environment
    .getAssets({
      'sys.id': assetId,
      // ハッシュを指定して画像ファイルの更新を検知する
      'fields.description': imageInfo.hash,
    })
    .catch((error) => {
      console.error({ error });
      return { items: [] };
    });

  if (assets.items.length > 0) {
    console.info(`更新がありませんでしたのでスキップします: ${relativePath} with hash: ${imageInfo.hash}`);
    return assets.items[0].sys.id;
  }

  // ファイルタイプの取得
  const contentType = mime.getType(imageInfo.src);

  if (!contentType) {
    console.error(`ファイルタイプが不明です。アセット登録をスキップします: ${relativePath}`);
    return;
  }

  // 画像をアップロード
  const upload = await uploadImage(environment, imageInfo.src);

  if (!upload) {
    console.error(`アップロードに失敗しました: ${relativePath}`);
    return;
  }

  // アセットを作成
  const asset = await createAsset(environment, assetId, fileName, contentType, upload);

  // アセットを処理して公開
  await asset.processForAllLocales().then((processedAsset) => processedAsset.publish());
  console.info(`アセットを作成しました: ${relativePath} with hash: ${imageInfo.hash}`);

  return asset.sys.id;
};

// ディレクトリ内のHTMLファイルを再帰的に取得する関数
export const getHtmlFiles = async (directory: string): Promise<string[]> => {
  const htmlFiles: string[] = [];

  const walk = async (dir: string) => {
    const dirEntities = await fs.readdir(dir, { withFileTypes: true });
    for await (const entity of dirEntities) {
      const fullPath = path.join(dir, entity.name);
      if (entity.isDirectory()) {
        await walk(fullPath);
      } else if (path.extname(fullPath) === '.html') {
        htmlFiles.push(fullPath);
      }
    }
  };
  await walk(directory);

  return htmlFiles;
};

export const processImageTags = async (
  root: HTMLElement,
  imageInfoMap: Map<string, ImageInfo>,
  environment: Environment,
  htmlFile: string,
  directory: string,
) => {
  const images = root.querySelectorAll('img');
  for (const img of images) {
    const src = img.getAttribute('src');
    if (!src) {
      console.error('src属性が見つかりませんでした');
      continue;
    }
    const absoluteSrc = path.resolve(path.dirname(htmlFile), src);
    // インプットのdirectoryを基準とした相対パス
    const relativeSrc = path.relative(directory, absoluteSrc);
    console.info(`画像ファイルを処理します: ${relativeSrc}`);

    // 画像ファイルのコンテンツを取得してハッシュ化
    const imageContent = await fs.readFile(absoluteSrc);
    const hash = createHash('sha256').update(imageContent).digest('hex');
    const imageInfo: ImageInfo = { src: absoluteSrc, hash };

    // アセット登録
    const key = `${relativeSrc}:${hash}`;
    if (!imageInfoMap.has(key)) {
      const assetId = await createImageAsset(environment, imageInfo, directory);
      if (!assetId) {
        continue;
      }
      imageInfo.assetId = assetId;

      // ファイルパスとファイル内容をキーにして、画像情報を管理
      imageInfoMap.set(key, imageInfo);
    }
    const fileUrl = await environment
      .getAsset(imageInfoMap.get(key)!.assetId!)
      .then((asset) => asset.fields.file.ja.url)
      .catch((error) => {
        console.error({ error });
        return src;
      });

    // Pageモデルの登録がないためこの段階ではContentfulの配信URLに置換する仮実装
    if (fileUrl) {
      img.setAttribute('src', fileUrl);
    }
  }

  return root;
};
