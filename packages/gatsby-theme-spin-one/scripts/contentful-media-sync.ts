#!/usr/bin/env node

import fs from 'fs/promises';
import * as contentfulManagement from 'contentful-management';
import { parse } from 'node-html-parser';
import { getHtmlFiles, processImageTags } from './lib/utils';
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

async function main() {
  const client = contentfulManagement.createClient({
    accessToken: managementToken,
  });
  const space = await client.getSpace(spaceId);
  const environment = await space.getEnvironment(environmentId);

  // 第一引数をディレクトリとして取得
  const directory = process.argv[2];

  if (!directory) {
    console.error('ディレクトリを指定してください。');
    process.exit(1);
  }

  try {
    const stat = await fs.stat(directory);
    if (!stat.isDirectory()) {
      console.error('指定されたパスはディレクトリではありません。');
      process.exit(1);
    }
  } catch (error) {
    console.error('ディレクトリの確認中にエラーが発生しました:', error);
    process.exit(1);
  }

  /**
   *  HTMLファイルを処理
   */

  // 処理対象とするHTMLファイルのインプットディレクトリを基準とした相対パスで取得
  const htmlFiles = await getHtmlFiles(directory);

  // 画像のコンテンツのハッシュと画像情報の対応表
  const imageInfoMap = new Map<string, ImageInfo>();

  for await (const htmlFile of htmlFiles) {
    const content = await fs.readFile(htmlFile, 'utf-8');
    let html = parse(content);

    // imgタグの処理
    html = await processImageTags(html, imageInfoMap, environment, htmlFile, directory);

    // FIXME: 動作確認のため、出力（ファイル更新は行わない）
    console.log(htmlFile);
    console.log(html.toString());
  }
}

main().catch((error) => {
  console.error('Error in main function:', error);
});
