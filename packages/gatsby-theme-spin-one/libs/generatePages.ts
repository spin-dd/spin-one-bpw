import path from 'path';
import { parseJson, resolveLocalePath, resolveTemplatePath } from './common';
import type { CreatePagesArgs } from 'gatsby';
import type { GeneratePagesOptions } from '../gatsby-node';

// Contentful Page からのページ生成
export const generatePages = async ({ graphql, actions }: CreatePagesArgs, options: GeneratePagesOptions) => {
  // GraphQLエラーを防ぐため、処理実行前にContentfulPageのentryが存在するか確認
  const checkPageContentEntry = await graphql<{
    allContentfulPage: Pick<Queries.ContentfulPageConnection, 'totalCount'>;
  }>(`
    {
      allContentfulPage {
        totalCount
      }
    }
  `);
  if (!checkPageContentEntry.data?.allContentfulPage.totalCount) {
    console.warn('No Page Content Entry found');
    return;
  }

  const { createPage } = actions;
  const { allLocales, defaultLocaleCode } = options;

  const result = await graphql<{
    allContentfulPage: Pick<Queries.ContentfulPageConnection, 'nodes'>;
  }>(`
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

  result.data?.allContentfulPage.nodes.forEach((page) => {
    const body = page.body?.raw ?? '';
    if (body === '') {
      // 該当 locale のページがない場合
      return;
    }
    const context = parseJson(page.context?.internal?.content as string) ?? {};
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
};
