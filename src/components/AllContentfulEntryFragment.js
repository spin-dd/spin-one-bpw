import { graphql } from 'gatsby'

export const query = graphql`
  fragment AllContentfulEntryFragment on Query {
    allContentfulComponent(
      filter: { node_locale: { eq: $locale }, spaceId: { eq: $spaceId } }
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
      filter: { node_locale: { eq: $locale }, spaceId: { eq: $spaceId } }
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
      filter: { node_locale: { eq: $locale }, spaceId: { eq: $spaceId } }
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
    allContentfulInformation(
      sort: { publishDate: DESC }
      filter: { node_locale: { eq: $locale }, spaceId: { eq: $spaceId } }
    ) {
      nodes {
        contentful_id
        __typename
        node_locale
        ...ContentfulInformationFieldsFragment
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

  fragment ContentfulInformationFieldsFragment on ContentfulInformation {
    slug
    label
    title
    body {
      childMarkdownRemark {
        html
        excerpt(truncate: true, pruneLength: 100)
      }
    }
    thumbnail {
      body {
        gatsbyImageData
      }
    }
    publishDate: publishDate(formatString: "YYYY-MM-DD")
    publishYear: publishDate(formatString: "YYYY")
    publishMonth: publishDate(formatString: "MM")
    publishDay: publishDate(formatString: "DD")
    displayDate: publishDate(formatString: "YYYY年MM月DD日")
    displayDateEn: publishDate(formatString: "MM-DD-YYYY")
    displayMonth: publishDate(formatString: "MMM")
  }

  fragment ContentfulTemplateFieldsFragment on ContentfulTemplate {
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
