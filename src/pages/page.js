import React from "react"
import { graphql } from "gatsby"

import { parseHtmlToReact, prepareForParse } from "../utils"
import { Layout } from "../components/layout"

export const Page = ({ data, pageContext }) => {
  const { htmlBody, htmlScript, componentData } = prepareForParse({
    template: data.contentfulTemplate,
    data,
    pageContext,
  })

  return (
    <Layout
      body={parseHtmlToReact(htmlBody, componentData)}
      script={parseHtmlToReact(htmlScript, componentData)}
    />
  )
}

export const query = graphql`
  query (
    $pagePath: String!
    $locale: String!
    # $slug: String
    $spaceId: String
  ) {
    contentfulTemplate: contentfulPage(
      pagePath: { eq: $pagePath }
      node_locale: { eq: $locale }
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
  }
`
