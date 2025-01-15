import path from 'path';
import type { Environment, RichTextCommentDocument } from 'contentful-management';
import type { HTMLElement } from 'node-html-parser';
import { CommentNode } from 'contentful-management/dist/typings/entities/comment';

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
    page.fields.head = { ja: convertToRichText(head) };
    page.fields.body = { ja: convertToRichText(body) };
    await page.update();
  } else {
    await environment.createEntry('page', {
      fields: {
        pagePath: {
          ja: pagePath,
        },
        head: {
          ja: convertToRichText(head),
        },
        body: {
          ja: convertToRichText(body),
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

const convertToRichText = (html: HTMLElement) => {
  const richText: RichTextCommentDocument = {
    nodeType: CommentNode.Document,
    data: {},
    content: [
      {
        nodeType: CommentNode.Paragraph,
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
