import React from "react"
import { graphql } from "gatsby"
import { Template } from "../components/page"

const Page = ({ data, pageContext }) => (
  <Template data={data} pageContext={pageContext} />
)
export default Page

export const query = graphql`
  query (
    $pagePath: String!
    # $slug: String
    $spaceId: String
  ) {
    contentfulTemplate: contentfulPage(
      pagePath: { eq: $pagePath }
      node_locale: { eq: "ja" }
      spaceId: { eq: $spaceId }
    ) {
      contentful_id
      __typename
      pagePath
      node_locale
      head {
        raw
      }
      body {
        raw
      }
      # script {
      #   raw
      # }
      context {
        internal {
          content
        }
      }
    }
    ...AllContentfulEntryFragment
  }
`
