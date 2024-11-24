import React from 'react';
import { graphql } from 'gatsby';
import { InformationDetail } from '../components/InformationDetail.js';

export { Head } from '../components/InformationDetail.js';

// InformationDetail
export default ({ data, pageContext }) => <InformationDetail data={data} pageContext={pageContext} />;

export const query = graphql`
  query ($name: String, $locale: String, $slug: String, $spaceId: String) {
    contentfulInformation(slug: { eq: $slug }, node_locale: { eq: $locale }, spaceId: { eq: $spaceId }) {
      contentful_id
      __typename
      node_locale
      ...ContentfulInformationFieldsFragment
    }
    contentfulTemplate(name: { eq: $name }, node_locale: { eq: $locale }, spaceId: { eq: $spaceId }) {
      contentful_id
      __typename
      name
      ...ContentfulTemplateFieldsFragment
    }
    ...AllContentfulEntryFragment
  }
`;
