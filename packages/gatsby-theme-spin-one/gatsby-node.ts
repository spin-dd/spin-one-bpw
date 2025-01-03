import * as contentful from 'contentful';
import fs from 'fs';
import path from 'path';
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

export const createSchemaCustomization = ({ actions, reporter }) => {
  const { createTypes, printTypeDefinitions } = actions;

  // テーマ内のschema.gql
  const filePath = path.resolve(__dirname, 'schema.gql');
  // Contentfulのオプショナルフィールドに値がない場合のGraphQLエラーを回避する
  const typeDefs = fs.readFileSync(filePath, 'utf8');
  createTypes(typeDefs);

  // MEMO: Contentful content model更新時などには
  // GATSBY_UPDATE_SCHEMA_SNAPSHOTをtrueにしてschema.gqlを更新する
  if (process.env.GATSBY_UPDATE_SCHEMA_SNAPSHOT === 'true') {
    // schema.gqlを更新するためにファイルを削除
    fs.unlinkSync(filePath);
    reporter.info('Removed schema file');
    // schema.gqlを更新する
    reporter.info(`Write schema file: ${filePath}`);
    printTypeDefinitions({ path: filePath });
  }
};
