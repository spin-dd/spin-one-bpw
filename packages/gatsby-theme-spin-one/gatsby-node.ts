import * as contentful from 'contentful';
import { config } from 'dotenv';
import { generatePages } from './libs/generatePages';
import { generateArticlePages } from './libs/generateArticlePages';
import { generateArticleListPages } from './libs/generateArticleListPages';
config();

/**
 * ユーティリティ
 */
// Contentful 公開環境の設定済みのロケールをすべて取得する
const getContentfulAllLocales = async (): Promise<Omit<contentful.Locale, 'sys'>[]> => {
  const client = contentful.createClient({
    space: process.env.CONTENTFUL_SPACE_ID as string,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string,
  });

  try {
    const { items } = await client.getLocales();
    return items;
  } catch (error) {
    console.error('Error fetching locales:', error);
    return [];
  }
};

// Contentful で設定済みのデフォルトロケールを取得する
const getContentfulDefaultLocaleCode = (locales: Omit<contentful.Locale, 'sys'>[] = []): string =>
  locales.find((locale) => locale.default)?.code;

/**
 * gatsby-nodeのページ生成処理
 */
export const createPages = async ({ graphql, actions, reporter }, themeOptions) => {
  const { overrideGatsbyNode = false } = themeOptions;
  // Gatsby theme では theme の gatsby-node を上書きできないため独自実装
  // フラグの設定がある場合、テーマのgatsby-nodeを実行せず、サイト側のgatsby-nodeを実行する
  if (overrideGatsbyNode) {
    return;
  }

  try {
    // Contentful のロケール情報取得
    const allLocales = await getContentfulAllLocales();
    // Contentful のデフォルトロケールコード取得
    const defaultLocaleCode = getContentfulDefaultLocaleCode(allLocales);

    await generatePages(
      { graphql, actions },
      {
        allLocales,
        defaultLocaleCode,
        ...themeOptions,
      },
    );
    await generateArticlePages(
      { graphql, actions },
      {
        allLocales,
        defaultLocaleCode,
        ...themeOptions,
      },
    );
    await generateArticleListPages(
      { graphql, actions },
      {
        allLocales,
        defaultLocaleCode,
        ...themeOptions,
      },
    );
  } catch (error) {
    reporter.panicOnBuild(`There was an error loading your Contentful posts`, error);
    return;
  }
};

// Contentful に entry が一つもない場合にエラーを出力し、ビルドを中断する
export const onPreInit = async ({ reporter }) => {
  const client = contentful.createClient({
    space: process.env.CONTENTFUL_SPACE_ID as string,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string,
  });

  const entries = await client.getEntries();
  if (entries.total === 0) {
    reporter.panic('No entries found in Contentful');
  }
};

// Contentful Content modelのオプショナルなフィールドをGraphQLスキーマに追加する
export const createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

  const typeDefs = `
  type Head implements Node {
    raw: String
  }
  type Body implements Node {
    raw: String
  }
  type Script implements Node {
    raw: String
  }
  type Context implements Node {
    internal: Internal
  }
  type Internal implements Node {
    content: String
  }
  type ContentfulComponent implements Node {
    props: Internal
    body: Body
  }
  type MarkdownRemark implements Node {
    html: String
    excerpt: String
  }
  type TextNode implements Node {
    childMarkdownRemark: MarkdownRemark
  }
  type ContentfulImage implements Node {
    props: Internal
  }
  type ContentfulElement implements Node {
    body: Body
  }
  type ContentfulPage implements Node {
    pagePath: String
    head: Head
    body: Body
    script: Script
    context: Context
  }
  type ContentfulTemplate implements Node {
    head: Head
    script: Script
    context: Context
  }
  type ContentfulArticle implements Node {
    body: TextNode
    thumbnail: ContentfulImage
  }
  type ContentfulCategory implements Node {
    description: String
  }
  type ContentfulType implements Node {
    description: String
  }
  `;
  createTypes(typeDefs);
};
