import { graphql } from 'gatsby';

export const query = graphql`
  # util.richTextToHtmlで利用するフラグメント
  fragment AllContentfulEntryFragment on Query {
    allContentfulComponent(filter: { node_locale: { eq: $locale }, spaceId: { eq: $spaceId } }) {
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
    allContentfulImage(filter: { node_locale: { eq: $locale }, spaceId: { eq: $spaceId } }) {
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
    allContentfulElement(filter: { node_locale: { eq: $locale }, spaceId: { eq: $spaceId } }) {
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

  fragment ContentfulArticleFieldsFragment on ContentfulArticle {
    type {
      slug
      name
    }
    slug
    title
    body {
      childMarkdownRemark {
        html
        excerpt(truncate: true, pruneLength: 100)
      }
    }
    category {
      slug
      name
    }
    thumbnail {
      body {
        gatsbyImageData
      }
    }
    publishDate
    displayDate: publishDate(formatString: "YYYY-MM-DD")
    displayDateYear: publishDate(formatString: "YYYY")
    displayDateMonth: publishDate(formatString: "MM")
    displayDateDay: publishDate(formatString: "DD")
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
`;
