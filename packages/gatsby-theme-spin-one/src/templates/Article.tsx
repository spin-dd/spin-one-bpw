import { graphql } from 'gatsby';
import { ArticleDetail } from '../components/ArticleDetail';

export { Head } from '../components/ArticleDetail';
export default ArticleDetail;
export const query = graphql`
  query ($name: String, $locale: String, $slug: String, $spaceId: String) {
    contentfulArticle(slug: { eq: $slug }, node_locale: { eq: $locale }, spaceId: { eq: $spaceId }) {
      contentful_id
      __typename
      node_locale
      ...ContentfulArticleFieldsFragment
    }
    template: contentfulTemplate(name: { eq: $name }, node_locale: { eq: $locale }, spaceId: { eq: $spaceId }) {
      contentful_id
      __typename
      name
      ...ContentfulTemplateFieldsFragment
    }
    ...AllContentfulEntryFragment
  }
`;
