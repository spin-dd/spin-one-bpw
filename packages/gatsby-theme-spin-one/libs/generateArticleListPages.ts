import path from 'path';
import { resolveLocalePath, resolveTemplatePath } from './common';

// Contentful ArticleType と ArticleCategory でカテゴライズした Article 一覧ページ生成
export const generateArticleListPages = async ({ graphql, actions }, themeOptions) => {
  // GraphQLエラーを防ぐため、処理実行前にContentfulArticleType、ContentfulArticleCategoryのentryが存在するか確認
  const checkEntry = await graphql(`
    {
      allContentfulArticleType {
        nodes {
          contentful_id
        }
      }
      allContentfulArticleCategory {
        nodes {
          contentful_id
        }
      }
    }
  `);
  if (
    checkEntry.data.allContentfulArticleType.nodes.length === 0 ||
    checkEntry.data.allContentfulArticleCategory.nodes.length === 0
  ) {
    console.warn('No ArticleType / ArticleCategory found');
    return;
  }

  const { allLocales = [] } = themeOptions;

  allLocales.forEach((locale) => {
    generateArticleListPageWithLocale({ graphql, actions }, themeOptions, locale.code);
  });
};

const generateArticleListPageWithLocale = async ({ graphql, actions }, themeOptions, locale) => {
  const { createPage } = actions;
  const { allLocales, defaultLocaleCode, articlesPerPage = 10 } = themeOptions;

  // GraphQLでは一つのクエリでArticleTypeとArticleCategoryでGroupByできないため、処理を分割する
  // まずはデフォルトロケールでArticleType、ArticleCategoryを取得
  // その後、指定条件でArticleを取得し、ページ生成する
  const result = await graphql(`
    {
      allContentfulArticleType(filter: { node_locale: { eq: "${locale}" } }) {
        nodes {
          contentful_id
          __typename
          node_locale
          slug
        }
      }
      allContentfulArticleCategory(filter: { node_locale: { eq: "${locale}" } }) {
        nodes {
          contentful_id
          __typename
          node_locale
          slug
        }
      }
    }
  `);

  const types = result.data.allContentfulArticleType.nodes;
  const categories = result.data.allContentfulArticleCategory.nodes;
  if (types.length === 0 || categories.length === 0) {
    console.info('No ArticleType / ArticleCategory found');
    return;
  }

  // モジュール内の共通処理関数
  const createArticleListPages = ({ articles, type, category = null }) => {
    // locale を含まない記事ページの pagePath を生成
    const createCanonicalPath = ({ type, category, page }) => {
      const basePath = category ? `/${type.slug}/${category.slug}/` : `/${type.slug}/`;
      return page === 1 ? basePath : `${basePath}${page}/`;
    };
    const createPagePath = ({ locale, type, category, page }) =>
      `${resolveLocalePath(locale, defaultLocaleCode)}${createCanonicalPath({
        type,
        category,
        page,
      })}`;

    const numPages = Math.ceil(articles.data.allContentfulArticle.totalCount / articlesPerPage);
    Array.from({ length: numPages }).forEach((_, i) => {
      const currentPage = i + 1;
      createPage({
        path: createPagePath({ locale, type, category, page: currentPage }),
        component: resolveTemplatePath(
          path.resolve('./src/templates/ArticleList.js'),
          require.resolve('@spin-dd/gatsby-theme-spin-one/src/templates/ArticleList.tsx'),
        ),
        context: {
          locales: allLocales,
          // TODO: I/F検討
          name: 'ArticleListPage',
          // Article検索条件
          locale,
          type: type.slug,
          ...(category && { category: category.slug }),
          sort: [
            {
              publishDate: 'DESC',
            },
          ],
          // ページネーション用
          limit: articlesPerPage,
          skip: i * articlesPerPage,
          currentPage,
          basePath: createPagePath({ locale, type, category, page: 1 }),
          // customToggleButton 用
          pagePath: createCanonicalPath({ type, category, page: currentPage }),
        },
      });
    });
  };

  // ArticleType[]、ArticleCategory[]をループして記事一覧ページを生成する
  for (const type of types) {
    // ArticleCategoryなしの記事一覧ページを生成
    const articles = await graphql(`
      {
        allContentfulArticle(
          filter: { type: { slug: { eq: "${type.slug}" } }, node_locale: { eq: "${locale}" } }
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
    createArticleListPages({ articles, type });

    // ArticleCategory[]をループして記事一覧ページを生成する
    for (const category of categories) {
      const articles = await graphql(`
        {
          allContentfulArticle(
            filter: { type: { slug: { eq: "${type.slug}" } }, category: { slug: { eq: "${category.slug}" } }, node_locale: { eq: "${locale}" } }
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
      createArticleListPages({ articles, type, category });
    }
  }
};
