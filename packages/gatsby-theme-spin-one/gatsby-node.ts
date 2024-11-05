import path from 'path';
import type { GatsbyNode } from 'gatsby';

export const createPages: GatsbyNode['createPages'] = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const result = await graphql<{ allContentfulPage: Queries.ContentfulPageConnection }>(`
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

  const pages = result.data?.allContentfulPage?.nodes ?? [];
  if (pages.length > 0) {
    const component = path.resolve('./src/templates/page.js');
    pages.forEach((page) => {
      const body = page.body?.raw ?? '';
      if (page.pagePath === null || body === '') {
        // 必要な設定がない場合はスキップ
        console.info('Skip creating empty page with pagePath:', page.pagePath);
        return;
      }
      const context = JSON.parse(page.context?.internal?.content ?? '{}');
      createPage({
        path: page.pagePath,
        component,
        context: {
          contentful_id: page.contentful_id,
          locale: page.node_locale,
          ...context,
        },
      });
    });
  }
};
