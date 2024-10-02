import path from "path"
import {
  parseJson,
  getContentfulAllLocales,
  getContentfulDefaultLocaleCode,
  resolveLocalePath,
} from "./src/utils/common.mjs"

const allLocales = await getContentfulAllLocales()
const defaultLocaleCode = getContentfulDefaultLocaleCode(allLocales)

export const createPages = async ({ graphql, actions, reporter }) => {
  try {
    await generatePages({ graphql, actions })
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
  if (pages && pages.length > 0) {
    const component = path.resolve("./src/pages/page.js")
    pages.forEach((page) => {
      const body = page.body.raw ?? ""
      if (body === "") {
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
          tag: "",
          ...context,
        },
      })
    })
  }
}
