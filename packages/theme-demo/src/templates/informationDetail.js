import React from "react";
import { graphql } from "gatsby";
import { InformationDetail as Template } from "@spin-dd/gatsby-theme-spin-one/src/components/informationDetail";

export { Head } from "@spin-dd/gatsby-theme-spin-one/src/components/informationDetail";

const InformationDetail = ({ data, pageContext }) => (
  <Template data={data} pageContext={pageContext} />
);
export default InformationDetail;

export const query = graphql`
  query ($name: String, $locale: String, $slug: String, $spaceId: String) {
    contentfulInformation(slug: { eq: $slug }, node_locale: { eq: $locale }) {
      contentful_id
      __typename
      node_locale
      ...ContentfulInformationFieldsFragment
    }
    contentfulTemplate(name: { eq: $name }, node_locale: { eq: $locale }) {
      contentful_id
      __typename
      name
      ...ContentfulTemplateFieldsFragment
    }
    ...AllContentfulEntryFragment
  }
`;
