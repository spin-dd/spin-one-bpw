import path from 'path';
import { parseJson, resolveLocalePath, resolveTemplatePath } from './common';

// Contentful Article からのページ生成
export const generateArticlePages = async ({ graphql, actions }, themeOptions) => {
  const { createPage } = actions;
  const { allLocales, defaultLocaleCode } = themeOptions;

  const result = await graphql(`
    {
      allContentfulArticle {
        nodes {
          contentful_id
          __typename
          node_locale
          type {
            slug
          }
          slug
          body {
            childMarkdownRemark {
              html
            }
          }
          category {
            slug
          }
        }
      }
    }
  `);
  if (result.data.allContentfulArticle.nodes.length === 0) {
    console.info('No Article Content Entry found');
    return;
  }

  if (result.errors) {
    throw result.errors;
  }

  // locale を含まない記事ページの pagePath を生成
  const createCanonicalPathPath = ({ type, category, slug }) => `/${type.slug}/${category.slug}/${slug}/`;
  const createPagePath = ({ node_locale, type, category, slug }) =>
    `${resolveLocalePath(node_locale, defaultLocaleCode)}${createCanonicalPathPath({
      type,
      category,
      slug,
    })}`;

  const article = result.data.allContentfulArticle.nodes;
  if (article.length > 0) {
    article.forEach((page) => {
      const body = page.body?.childMarkdownRemark.html ?? '';
      if (body === '') {
        // 該当 locale のページがない場合
        console.info('No Article Content Body found');
        return;
      }
      const context = parseJson(page.context?.internal?.content) ?? {};
      createPage({
        path: createPagePath(page),
        component: resolveTemplatePath(
          path.resolve('./src/templates/Article.js'),
          require.resolve('@spin-dd/gatsby-theme-spin-one/src/templates/Article.tsx'),
        ),
        context: {
          locales: allLocales,
          // TODO: I/F検討
          // ArticleTypeを考慮したデフォルトテンプレート名
          name: 'ArticleDetail',
          locale: page.node_locale,
          slug: page.slug,
          // customToggleButton 用
          pagePath: createCanonicalPathPath(page),
          ...context,
        },
      });
    });
  } else {
    console.info('No Article Content Entry found');
  }
};
