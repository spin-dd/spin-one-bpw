import { graphql } from 'gatsby'

export const query = graphql`
  fragment AllContentfulEntryFragment on Query {
    allContentfulComponent(
      filter: { node_locale: { eq: "ja" }, spaceId: { eq: $spaceId } }
    ) {
      nodes {
        contentful_id
        __typename
        name
        moduleName
        props {
          internal {
            content
          }
        }
        body {
          raw
        }
      }
    }
    allContentfulImage(
      filter: { node_locale: { eq: "ja" }, spaceId: { eq: $spaceId } }
    ) {
      nodes {
        contentful_id
        __typename
        name
        moduleName
        props {
          internal {
            content
          }
        }
        body {
          gatsbyImageData
        }
      }
    }
    allContentfulElement(
      filter: { node_locale: { eq: "ja" }, spaceId: { eq: $spaceId } }
    ) {
      nodes {
        contentful_id
        __typename
        name
        body {
          raw
        }
      }
    }
  }

  fragment ContentfulPageFieldsFragment on ContentfulPage {
    head {
      raw
    }
    body {
      raw
    }
    script {
      raw
    }
    context {
      internal {
        content
      }
    }
  }
`
