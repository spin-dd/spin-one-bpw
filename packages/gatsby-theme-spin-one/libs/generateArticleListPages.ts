import path from 'path';
import { resolveLocalePath, resolveTemplatePath } from './common';

// Contentful ArticleType と ArticleCategory でカテゴライズした Article 一覧ページ生成
export const generateArticleListPages = async ({ graphql, actions }, themeOptions) => {
  const { createPage } = actions;
  const { allLocales, defaultLocaleCode, articlesPerPage = 10 } = themeOptions;

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
      # 多言語対応のため、categoryは全てのロケールのものを取得
      allContentfulArticleCategory {
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
  const createCanonicalPath = ({ type, category, page }) => {
    const basePath = `/${type.slug}/${category.slug}/`;
    return page === 1 ? basePath : `${basePath}${page}/`;
  };
  const createPagePath = ({ node_locale, type, category, page }) =>
    `${resolveLocalePath(node_locale, defaultLocaleCode)}${createCanonicalPath({
      type,
      category,
      page,
    })}`;

  // ArticleType[]、ArticleCategory[]をループしてページ生成する
  const types = result.data.allContentfulArticleType.nodes;
  const categories = result.data.allContentfulArticleCategory.nodes;
  if (types.length === 0 || categories.length === 0) {
    console.info('No ArticleType / ArticleCategory found');
    return;
  }

  for (const type of types) {
    for (const category of categories) {
      const articles = await graphql(`
        {
          allContentfulArticle(
            filter: { type: { slug: { eq: "${type.slug}" } }, category: { slug: { eq: "${category.slug}" } }, node_locale: { eq: "${category.node_locale}" } }
          ) {
            nodes {
              contentful_id
              __typename
              node_locale
              slug
            }
            totalCount
          }
        }
      `);
      const numPages = Math.ceil(articles.data.allContentfulArticle.totalCount / articlesPerPage);
      Array.from({ length: numPages }).forEach((_, i) => {
        const currentPage = i + 1;
        createPage({
          path: createPagePath({ node_locale: category.node_locale, type, category, page: currentPage }),
          component: resolveTemplatePath(
            path.resolve('./src/templates/ArticleList.js'),
            require.resolve('@spin-dd/gatsby-theme-spin-one/src/templates/ArticleList.tsx'),
          ),
          context: {
            locales: allLocales,
            // TODO: I/F検討
            name: 'ArticleList',
            // Article検索条件
            locale: category.node_locale,
            type: type.slug,
            category: category.slug,
            sort: [
              {
                publishDate: 'DESC',
              },
            ],
            // ページネーション用
            limit: articlesPerPage,
            skip: i * articlesPerPage,
            currentPage,
            basePath: createPagePath({ node_locale: category.node_locale, type, category, page: 1 }),
            // customToggleButton 用
            pagePath: createCanonicalPath({ type, category, page: currentPage }),
          },
        });
      });
    }
  }
};
