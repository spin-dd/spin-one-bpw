import { graphql } from 'gatsby';
import { Page } from '../components/Page';

export { Head } from '../components/Head';
export default Page;
export const query = graphql`
  query ($locale: String, $pagePath: String, $spaceId: String) {
    template: contentfulPage(node_locale: { eq: $locale }, pagePath: { eq: $pagePath }, spaceId: { eq: $spaceId }) {
      contentful_id
      __typename
      pagePath
      node_locale
      ...ContentfulPageFieldsFragment
    }
    ...AllContentfulEntryFragment
  }
`;
