import path from 'path';
import type { Environment } from 'contentful-management';
import type { HTMLElement } from 'node-html-parser';

// ContentfulのPage Contentを作成する関数
export const createContentfulPage = async (
  html: HTMLElement,
  environment: Environment,
  htmlFile: string,
  directory: string,
) => {
  // pagePathを生成
  const pagePath = generatePagePath(htmlFile, directory);

  // pagePathをキーに、すでに存在すれば上書き、なければ新規作成する
  const page = await environment
    .getEntries({
      content_type: 'page',
      'fields.pagePath': pagePath,
    })
    .then((entries) => entries.items[0]);

  if (page) {
    console.info(`Page Contentを更新します: ${pagePath}`);
  } else {
    console.info(`Page Contentを作成します: ${pagePath}`);
  }

  const head = html.querySelector('head');
  const body = html.querySelector('body');
  if (!head) {
    console.warn('head not found');
    return;
  }
  if (!body) {
    console.warn('body not found');
    return;
  }

  // Page Contentの作成・更新
  if (page) {
    page.fields.head = { ja: await convertToRichText(head) };
    page.fields.body = { ja: await convertToRichText(body) };
    await page.update();
  } else {
    await environment.createEntry('page', {
      fields: {
        pagePath: {
          ja: pagePath,
        },
        head: {
          ja: await convertToRichText(head),
        },
        body: {
          ja: await convertToRichText(body),
        },
      },
    });
  }
};

// HTMLファイルのパスからPage ContentのpagePathを生成する関数
// 例:
// - path/to/index.html -> /path/to
// - path/to/page.html -> /path/to/page
const generatePagePath = (htmlFilePath: string, baseDirectory: string) => {
  const relativePath = path.relative(baseDirectory, htmlFilePath);
  // windowsの場合、パスの区切り文字がバックスラッシュになるため、スラッシュに変換
  const pagePath = path
    .join('/', relativePath)
    .replace(/\\/g, '/')
    .replace(/\.html$/, '');
  return pagePath.replace(/\/index$/, '/');
};

const convertToRichText = async (html: HTMLElement) => {
  // TODO: コンポーネント、アセット連携
  const richText = {
    nodeType: 'document',
    data: {},
    content: [
      {
        nodeType: 'paragraph',
        content: [
          {
            nodeType: 'text',
            // ルートのタグ（head/body）そのものは除く
            value: html.innerHTML.toString(),
            marks: [],
            data: {},
          },
        ],
        data: {},
      },
    ],
  };
  return richText;
};
