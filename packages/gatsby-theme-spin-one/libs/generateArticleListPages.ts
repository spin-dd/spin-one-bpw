import path from 'path';
import { resolveLocalePath, resolveTemplatePath } from './common';

// Contentful ArticleType と ArticleCategory でカテゴライズした Article 一覧ページ生成
export const generateArticleListPages = async ({ graphql, actions }, themeOptions) => {
  const { createPage } = actions;
  const { allLocales, defaultLocaleCode } = themeOptions;

  // GraphQLでは一つのクエリでArticleTypeとArticleCategoryでGroupByできないため、処理を分割する
  // まずはデフォルトロケールでArticleType、ArticleCategoryを取得する
  // なお、Articleとして取得しないのは件数上限による制約を回避するため
  const result = await graphql(`
    {
      allContentfulArticleType(filter: { node_locale: { eq: "${defaultLocaleCode}" } }) {
        nodes {
          contentful_id
          __typename
          node_locale
          slug
        }
      }
      allContentfulArticleCategory(filter: { node_locale: { eq: "${defaultLocaleCode}" } }) {
        nodes {
          contentful_id
          __typename
          node_locale
          slug
        }
      }
    }
  `);

  // locale を含まない記事ページの pagePath を生成
  const createCanonicalPathPath = ({ type, category }) => `/${type.slug}/${category.slug}/`;
  const createPagePath = ({ node_locale, type, category }) =>
    `${resolveLocalePath(node_locale, defaultLocaleCode)}${createCanonicalPathPath({
      type,
      category,
    })}`;

  // ArticleType[]、ArticleCategory[]をループしてページ生成する
  const types = result.data.allContentfulArticleType.nodes;
  const categories = result.data.allContentfulArticleCategory.nodes;
  if (types.length > 0 && categories.length > 0) {
    types.forEach((type) => {
      categories.forEach((category) => {
        createPage({
          path: createPagePath({ node_locale: category.node_locale, type, category }),
          component: resolveTemplatePath(
            path.resolve('./src/templates/ArticleList.js'),
            require.resolve('@spin-dd/gatsby-theme-spin-one/src/templates/ArticleList.tsx'),
          ),
          context: {
            locales: allLocales,
            // TODO: I/F検討
            templateList: 'ArticleList',
            templateListDetail: 'ArticleListDetail',
            locale: category.node_locale,
            type: type.slug,
            category: category.slug,
            // customToggleButton 用
            pagePath: createCanonicalPathPath({ type, category }),
          },
        });
      });
    });
  } else {
    console.info('No ArticleType / ArticleCategory found');
  }
};
