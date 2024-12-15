import path from 'path';
import { parseJson } from './common';

// Contentful Page からのページ生成
export const generatePages = async ({ graphql, actions }, themeOptions, { resolveLocalePath, resolveTemplatePath }) => {
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
          path.resolve('./templates/Page.js'),
          require.resolve('@spin-dd/gatsby-theme-spin-one/src/templates/Page.tsx'),
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
