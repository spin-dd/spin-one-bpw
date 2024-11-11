import React from "react";
import { graphql } from "gatsby";
import { Page as Template } from "@spin-dd/gatsby-theme-spin-one/src/components/page";

export { Head } from "@spin-dd/gatsby-theme-spin-one/src/components/page";

const Page = ({ data, pageContext }) => (
  <Template data={data} pageContext={pageContext} />
);
export default Page;

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
