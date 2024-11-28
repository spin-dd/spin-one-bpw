import React from 'react';
import { graphql } from 'gatsby';
import { Page } from '../components/Page';

export { Head } from '../components/Head';

// Page
export default ({ data, pageContext }) => <Page data={data} pageContext={pageContext} />;

export const query = graphql`
  query ($locale: String, $pagePath: String, $spaceId: String) {
    contentfulTemplate: contentfulPage(
      node_locale: { eq: $locale }
      pagePath: { eq: $pagePath }
      spaceId: { eq: $spaceId }
    ) {
      contentful_id
      __typename
      pagePath
      node_locale
      ...ContentfulPageFieldsFragment
    }
    ...AllContentfulEntryFragment
  }
`;
