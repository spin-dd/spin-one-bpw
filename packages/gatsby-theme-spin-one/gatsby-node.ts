import path from 'path';
import fs from 'fs';
import * as contentful from 'contentful';
import { parseJson } from './src/utils/common';
import { config } from 'dotenv';
config();

/**
 * テーマオプションデフォルト値
 */
// お知らせページのプレフィックスパス
const THEME_INFORMATION_PREFIX_PATH = '/information';

/**
 * ユーティリティ
 * FIXME: contentfulモジュールがCommonJSとして利用することしかできないため、tscでCommonJSモジュールとしてコンパイルするgatsby-node.tsに実装している
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

// ロケールに基づいてパスを解決する
const resolveLocalePath = (locale: string, defaultLocaleCode: string): string =>
  locale === defaultLocaleCode ? '' : `/${locale}`;

// テンプレートファイルのパスを動的に決定する関数
// サイト側にテンプレートファイルが存在する場合はそちらを優先する
const resolveTemplatePath = (sitePath: string, themePath: string): string => {
  return fs.existsSync(sitePath) ? sitePath : themePath;
};

/**
 * gatsby-nodeのページ生成処理
 */
export const createPages = async ({ graphql, actions, reporter }, themeOptions) => {
  const { overrideGatsbyNode = false } = themeOptions;
  // Gatsby theme では theme の gatsby-node を上書きできないため独自実装
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
    await generateInformationPages(
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

// Contentful Page からのページ生成
const generatePages = async ({ graphql, actions }, themeOptions) => {
  const { createPage } = actions;
  const { allLocales, defaultLocaleCode } = themeOptions;

  const result = await graphql(`
    {
      allContentfulPage {
        nodes {
          contentful_id
          __typename
          pagePath
          node_locale
          body {
            raw
          }
          context {
            internal {
              content
            }
          }
        }
      }
    }
  `);
  if (result.errors) {
    throw result.errors;
  }

  const pages = result.data.allContentfulPage.nodes;
  if (pages.length > 0) {
    pages.forEach((page) => {
      const body = page.body?.raw ?? '';
      if (body === '') {
        // 該当 locale のページがない場合
        return;
      }
      const context = parseJson(page.context?.internal?.content) ?? {};
      createPage({
        path: `${resolveLocalePath(page.node_locale, defaultLocaleCode)}${page.pagePath}`,
        component: resolveTemplatePath(
          path.resolve('./src/templates/Page.js'),
          require.resolve('@spin-dd/gatsby-theme-spin-one/src/templates/Page.js'),
        ),
        context: {
          locales: allLocales,
          pagePath: page.pagePath,
          locale: page.node_locale,
          // Page context に指定がない場合全件ヒットするのを防止する
          tag: '',
          ...context,
        },
      });
    });
  } else {
    console.info('No Page Content found');
  }
};

// Contentful Information からのページ生成
const generateInformationPages = async ({ graphql, actions }, themeOptions) => {
  const { createPage } = actions;
  const { allLocales, defaultLocaleCode, informationPrefixPath = THEME_INFORMATION_PREFIX_PATH } = themeOptions;

  const result = await graphql(`
    {
      allContentfulInformation {
        nodes {
          contentful_id
          __typename
          node_locale
          slug
          body {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
  `);
  if (result.errors) {
    throw result.errors;
  }

  // locale を含まないお知らせページの pagePath を生成
  const createInformationCanonicalPathPath = ({ slug }) => `${informationPrefixPath}/${slug}/`;
  const createInformationPagePath = ({ node_locale, slug }) =>
    `${resolveLocalePath(node_locale, defaultLocaleCode)}${createInformationCanonicalPathPath({
      slug,
    })}`;

  const information = result.data.allContentfulInformation.nodes;
  if (information.length > 0) {
    information.forEach((page) => {
      const body = page.body?.childMarkdownRemark.html ?? '';
      if (body === '') {
        // 該当 locale のページがない場合
        console.info('No Information Content Body found');
        return;
      }
      createPage({
        path: createInformationPagePath(page),
        component: resolveTemplatePath(
          path.resolve('./src/templates/InformationDetail.js'),
          require.resolve('@spin-dd/gatsby-theme-spin-one/src/templates/InformationDetail.js'),
        ),
        context: {
          locales: allLocales,
          // TODO: I/F検討
          // デフォルトテンプレート名
          name: 'informationDetail',
          locale: page.node_locale,
          slug: page.slug,
          // customToggleButton 用
          pagePath: createInformationCanonicalPathPath(page),
        },
      });
    });
  } else {
    console.info('No Information Content found');
  }
};
