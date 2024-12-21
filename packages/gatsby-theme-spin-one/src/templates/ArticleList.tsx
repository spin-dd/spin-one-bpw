import React from 'react';
import { graphql } from 'gatsby';
import { ArticleList } from '../components/ArticleList';

export { Head } from '../components/ArticleList';

export default ({ data, pageContext }) => <ArticleList data={data} pageContext={pageContext} />;

export const query = graphql`
  query (
    $name: String
    $locale: String
    $type: String
    $category: String
    $spaceId: String
    $limit: Int
    $skip: Int
    $sort: [ContentfulArticleSortInput!]
  ) {
    allContentfulArticle(
      filter: {
        category: { slug: { eq: $category } }
        type: { slug: { eq: $type } }
        node_locale: { eq: $locale }
        spaceId: { eq: $spaceId }
      }
      limit: $limit
      skip: $skip
      sort: $sort
    ) {
      nodes {
        contentful_id
        __typename
        node_locale
        ...ContentfulArticleFieldsFragment
      }
      pageInfo {
        currentPage
        pageCount
        hasPreviousPage
        hasNextPage
      }
    }
    # リストページのテンプレート
    contentfulTemplate(name: { eq: $name }, node_locale: { eq: $locale }, spaceId: { eq: $spaceId }) {
      contentful_id
      __typename
      name
      ...ContentfulTemplateFieldsFragment
    }
    ...AllContentfulEntryFragment
  }
`;
