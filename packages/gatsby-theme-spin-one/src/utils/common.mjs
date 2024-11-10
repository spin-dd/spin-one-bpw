// gatsby-*、コンポーネントの両方で使う関数はこのファイル内で定義する
import * as contentful from "contentful"

// サイト全体のデフォルトロケールコード
const DEFAULT_LOCALE_CODE = "ja"
const SECOND_LOCALE_CODE = "en"

export const parseJson = (json = null) => {
  try {
    return JSON.parse(json)
  } catch (e) {
    console.error("JSON parse error", e)
  }
}

// Contentful で設定済みのロケールをすべて取得する
export const getContentfulAllLocales = async () => {
  // https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/spaces/space/get-a-space/console
  const client = contentful.createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    environment: process.env.CONTENTFUL_ENVIRONMENT_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  })
  return await client
    .getSpace()
    .then(({ locales }) => locales)
    .catch((error) => {
      console.log({ error })
    })
}

// Contentful で設定済みのデフォルトロケールを取得する
export const getContentfulDefaultLocaleCode = (locales = []) =>
  locales.find((locale) => locale.default)?.code || DEFAULT_LOCALE_CODE
// Contentful で設定済みのデフォルトではないロケールのうち最初のロケールを取得する
export const getContentfulSecondLocaleCode = (locales = []) =>
  locales.find((locale) => !locale.default)?.code || SECOND_LOCALE_CODE

export const resolveLocalePath = (locale, defaultLocaleCode) =>
  locale === defaultLocaleCode ? "" : `/${locale}`
