import path from 'path';
import { resolveLocalePath, resolveTemplatePath } from './common';
import type { CreatePagesArgs } from 'gatsby';
import type { GeneratePagesOptions } from '../gatsby-node';

// Contentful Article からのページ生成
export const generateArticlePages = async ({ graphql, actions }: CreatePagesArgs, options: GeneratePagesOptions) => {
  // GraphQLエラーを防ぐため、処理実行前にContentfulArticleのentryが存在するか確認
  const checkArticleContentEntry = await graphql<{
    allContentfulArticle: Pick<Queries.ContentfulArticleConnection, 'totalCount'>;
  }>(`
    {
      allContentfulArticle {
        totalCount
      }
    }
  `);
  if (!checkArticleContentEntry.data?.allContentfulArticle.totalCount) {
    console.warn('No Article Content Entry found');
    return;
  }

  const { createPage } = actions;
  const { allLocales, defaultLocaleCode } = options;

  const result = await graphql<{
    allContentfulArticle: Pick<Queries.ContentfulArticleConnection, 'nodes'>;
  }>(`
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

  if (result.errors) {
    throw result.errors;
  }

  // locale を含まない記事ページの pagePath を生成
  const createCanonicalPathPath = ({
    type,
    category,
    slug,
  }: Pick<Queries.ContentfulArticle, 'type' | 'category' | 'slug'>) => `/${type?.slug}/${category?.slug}/${slug}/`;
  const createPagePath = ({
    node_locale,
    type,
    category,
    slug,
  }: Pick<Queries.ContentfulArticle, 'node_locale' | 'type' | 'category' | 'slug'>) =>
    `${resolveLocalePath(node_locale, defaultLocaleCode)}${createCanonicalPathPath({
      type,
      category,
      slug,
    })}`;

  result.data?.allContentfulArticle.nodes.forEach((page) => {
    const body = page.body?.childMarkdownRemark?.html ?? '';
    if (body === '') {
      // 該当 locale のページがない場合
      console.info('No Article Content Body found');
      return;
    }

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
        name: 'ArticlePage',
        locale: page.node_locale,
        slug: page.slug,
        // customToggleButton 用
        pagePath: createCanonicalPathPath(page),
      },
    });
  });
};
