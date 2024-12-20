import React from 'react';
import { graphql } from 'gatsby';
import { ArticleList } from '../components/ArticleList';

export { Head } from '../components/ArticleList';

export default ({ data, pageContext }) => <ArticleList data={data} pageContext={pageContext} />;

export const query = graphql`
  query (
    $templateList: String
    $templateListDetail: String
    $locale: String
    $type: String
    $category: String
    $spaceId: String
  ) {
    allContentfulArticle(
      filter: {
        category: { slug: { eq: $category } }
        type: { slug: { eq: $type } }
        node_locale: { eq: $locale }
        spaceId: { eq: $spaceId }
      }
    ) {
      nodes {
        contentful_id
        __typename
        node_locale
        ...ContentfulArticleFieldsFragment
      }
    }
    # リストページのテンプレート
    contentfulTemplate(name: { eq: $templateList }, node_locale: { eq: $locale }, spaceId: { eq: $spaceId }) {
      contentful_id
      __typename
      name
      ...ContentfulTemplateFieldsFragment
    }
    # リストページ内の一覧部分のテンプレート
    articleListDetailTemplate: contentfulTemplate(
      name: { eq: $templateListDetail }
      node_locale: { eq: $locale }
      spaceId: { eq: $spaceId }
    ) {
      contentful_id
      __typename
      name
      ...ContentfulTemplateFieldsFragment
    }
    ...AllContentfulEntryFragment
  }
`;
