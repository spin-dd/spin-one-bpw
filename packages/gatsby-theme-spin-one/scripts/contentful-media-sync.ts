#!/usr/bin/env node

import { createHash } from 'crypto';
import { parse } from 'node-html-parser';
import * as contentfulManagement from 'contentful-management';
import mime from 'mime';
import fs from 'fs/promises';
import path from 'path';
// envファイルに設定した情報を読み込む
import { config } from 'dotenv';
config();

const spaceId = process.env.CONTENTFUL_SPACE_ID as string;
const managementToken = process.env.CONTENTFUL_MANAGEMENT_TOKEN as string;
const environmentId = process.env.CONTENTFUL_ENVIRONMENT_ID as string;

console.log('Sync media with the following config:');
console.log('Space ID:', spaceId);
console.log('Environment ID:', environmentId);
console.log('CMA Token:', managementToken.slice(0, -5).replace(/./g, '*') + managementToken.slice(-5));

if (!spaceId || !managementToken || !environmentId) {
  console.error('Contentfulの設定が不足しています。');
  process.exit(1);
}

const client = contentfulManagement.createClient({
  accessToken: managementToken,
});

async function main() {
  const space = await client.getSpace(spaceId);
  const environment = await space.getEnvironment(environmentId);

  interface ImageInfo {
    src: string;
    hash: string;
    assetId?: string;
  }

  // Contentful に画像をアップロードし、アセットを作成する関数
  async function createAsset(imageInfo: ImageInfo, directory: string): Promise<string | undefined> {
    // 対象画像ファイル
    const fileName = path.basename(imageInfo.src);
    const relativePath = path.relative(directory, imageInfo.src);
    // directoryからの相対パスをハッシュ化してアセットのIDとして使用する
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
    const fd = await fs.open(imageInfo.src, 'r');
    const upload = await environment
      .createUpload({
        file: await fd.readFile(),
      })
      .finally(() => fd.close())
      .catch((error) => {
        console.error({ error });
        return undefined;
      });

    if (!upload) {
      console.error(`アップロードに失敗しました: ${relativePath}`);
      return undefined;
    }

    // アセットを作成
    const asset = await environment.createAssetWithId(assetId, {
      fields: {
        title: {
          // デフォルト言語のみ設定
          // TODO: 仕様確認が必要
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
        description: {
          ja: imageInfo.hash,
        },
      },
    });

    // アセットを処理（公開はしない）
    await asset.processForAllLocales();

    console.info(`アセットを作成しました: ${relativePath} with hash: ${imageInfo.hash}`);
    return asset.sys.id;
  }

  // ディレクトリ内のHTMLファイルを再帰的に取得する関数
  async function findHtmlFiles(directory: string): Promise<string[]> {
    const htmlFiles: string[] = [];

    const walk = async (dir: string) => {
      const dirents = await fs.readdir(dir, { withFileTypes: true });
      for await (const dirent of dirents) {
        const fullPath = path.join(dir, dirent.name);
        if (dirent.isDirectory()) {
          await walk(fullPath);
        } else if (path.extname(fullPath) === '.html') {
          htmlFiles.push(fullPath);
        }
      }
    };
    await walk(directory);

    return htmlFiles;
  }

  // html ファイルを入力に img タグに指定されたローカル画像をContentfulに登録する関数
  // 画像はハッシュ化して重複を除去
  async function processHtmlFiles(htmlFiles: string[], directory: string) {
    // 画像のコンテンツのハッシュと画像情報の対応表
    const imageInfoMap = new Map<string, ImageInfo>();

    for await (const htmlFile of htmlFiles) {
      const content = await fs.readFile(htmlFile, 'utf-8');
      const root = parse(content);
      const images = root.querySelectorAll('img');

      // 各imgタグの処理
      for (const img of images) {
        const src = img.getAttribute('src');
        if (!src) {
          continue;
        }
        const absoluteSrc = path.resolve(path.dirname(htmlFile), src);

        // 画像ファイルのコンテンツを取得してハッシュ化
        const imageContent = await fs.readFile(absoluteSrc);
        const hash = createHash('sha256').update(imageContent).digest('hex');
        const imageInfo: ImageInfo = { src: absoluteSrc, hash };

        // アセット登録
        const key = `${absoluteSrc}:${hash}`;
        if (!imageInfoMap.has(key)) {
          const assetId = await createAsset(imageInfo, directory);
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
      // FIXME: 動作確認のため、出力（ファイル更新は行わない）
      console.log(root.toString());
    }
  }

  // 第一引数をディレクトリとして取得
  const directory = process.argv[2];

  if (!directory) {
    console.error('ディレクトリを指定してください。');
    process.exit(1);
  }

  // HTMLファイルのパスを取得
  const htmlFiles = await findHtmlFiles(directory);

  // 取得したHTMLファイルからimgタグに指定された画像情報を取得
  await processHtmlFiles(htmlFiles, directory);
}

main().catch((error) => {
  console.error('Error in main function:', error);
});
