import * as contentful from 'contentful';
import { config } from 'dotenv';
import { generatePages } from './libs/generatePages';
import { generateArticlePages } from './libs/generateArticlePages';
import { generateArticleListPages } from './libs/generateArticleListPages';
import type { GatsbyNode, PluginOptions } from 'gatsby';

// dotenv の設定
config();

export interface SpinOneThemeOptions extends PluginOptions {
  overrideGatsbyNode?: boolean;
  articlesPerPage?: number;
}

export type GeneratePagesOptions = {
  allLocales: Omit<contentful.Locale, 'sys'>[];
  defaultLocaleCode: string;
};

const DefaultLocaleCode = 'ja';

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
  locales.find((locale) => locale.default)?.code ?? DefaultLocaleCode;

/**
 * gatsby-nodeのページ生成処理
 */
export const createPages: GatsbyNode['createPages'] = async (createPagesArgs, themeOptions: SpinOneThemeOptions) => {
  const { reporter } = createPagesArgs;
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

    await generatePages(createPagesArgs, {
      allLocales,
      defaultLocaleCode,
    });
    await generateArticlePages(createPagesArgs, {
      allLocales,
      defaultLocaleCode,
    });
    await generateArticleListPages(
      createPagesArgs,
      {
        allLocales,
        defaultLocaleCode,
      },
      themeOptions,
    );
  } catch (error) {
    reporter.panicOnBuild(`There was an error loading your Contentful posts:`, error as Error);
    return;
  }
};

export const onPreInit: GatsbyNode['onPreInit'] = async ({ reporter }) => {
  // Contentful に entry が一つもない場合にエラーを出力し、ビルドを中断する
  const client = contentful.createClient({
    space: process.env.CONTENTFUL_SPACE_ID as string,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string,
  });

  const entries = await client.getEntries();
  if (entries.total === 0) {
    reporter.panic('No entries found in Contentful');
  }
};
