import path from 'path'
import {
  parseJson,
  getContentfulAllLocales,
  getContentfulDefaultLocaleCode,
  resolveLocalePath,
} from './src/utils/common.mjs'

const allLocales = await getContentfulAllLocales()
const defaultLocaleCode = getContentfulDefaultLocaleCode(allLocales)

export const createPages = async (
  { graphql, actions, reporter },
  themeOptions
) => {
  const { overrideGatsbyNode = false } = themeOptions
  // Gatsby theme では gatsby-node を上書きできないため独自実装
  if (overrideGatsbyNode) {
    return
  }

  try {
    await generatePages({ graphql, actions })
    await generateInformationPages({ graphql, actions })
  } catch (error) {
    reporter.panicOnBuild(
      `There was an error loading your Contentful posts`,
      error
    )
    return
  }
}

// Contentful Page からのページ生成
const generatePages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(
    `
      {
        allContentfulPage {
          nodes {
            contentful_id
            __typename
            pagePath
            node_locale
            body {
              raw
            }
            context {
              internal {
                content
              }
            }
          }
        }
      }
    `
  )
  if (result.errors) {
    throw result.errors
  }

  const pages = result.data.allContentfulPage.nodes
  if (pages.length > 0) {
    const component = path.resolve('./src/templates/page.js')
    pages.forEach((page) => {
      const body = page.body?.raw ?? ''
      if (body === '') {
        // 該当 locale のページがない場合
        return
      }
      const context = parseJson(page.context?.internal?.content) ?? {}
      createPage({
        path: `${resolveLocalePath(page.node_locale, defaultLocaleCode)}${
          page.pagePath
        }`,
        component,
        context: {
          locales: allLocales,
          pagePath: page.pagePath,
          locale: page.node_locale,
          // Page context に指定がない場合全件ヒットするのを防止する
          tag: '',
          ...context,
        },
      })
    })
  }
}

// お知らせページ prefixPath
const informationPrefixPath = '/information'

// locale を含まないお知らせページの pagePath を生成
const createInformationCanonicalPathPath = ({ slug }) =>
  `${informationPrefixPath}/${slug}/`
const createInformationPagePath = ({ node_locale, slug }) =>
  `${resolveLocalePath(
    node_locale,
    defaultLocaleCode
  )}${createInformationCanonicalPathPath({
    slug,
  })}`

// Contentful Information からのページ生成
const generateInformationPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(
    `
      {
        allContentfulInformation {
          nodes {
            contentful_id
            __typename
            node_locale
            slug
            body {
              childMarkdownRemark {
                html
              }
            }
          }
        }
      }
    `
  )
  if (result.errors) {
    throw result.errors
  }

  const information = result.data.allContentfulInformation.nodes
  if (information.length > 0) {
    const component = path.resolve('./src/templates/informationDetail.js')
    information.forEach((page) => {
      const body = page.body?.childMarkdownRemark.html ?? ''
      if (body === '') {
        // 該当 locale のページがない場合
        return
      }
      createPage({
        path: createInformationPagePath(page),
        component,
        context: {
          locales: allLocales,
          name: 'informationDetail',
          locale: page.node_locale,
          slug: page.slug,
          // customToggleButton 用
          pagePath: createInformationCanonicalPathPath(page),
        },
      })
    })
  }
}

// https://www.gatsbyjs.com/docs/actions/#createTypes
export const createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  // https://swiperjs.com/swiper-api#autoplay の Union type に対応する
  const typeDefs = `
    type contentfulComponentPropsJsonNode implements Node @dontInfer
    type ContentfulComponentPropsJsonNodeJson implements Node @dontInfer
    type contentfulTemplateContextJsonNode implements Node @dontInfer
    type ContentfulTemplateContextJsonNodeJson implements Node @dontInfer
  `
  createTypes(typeDefs)
}
