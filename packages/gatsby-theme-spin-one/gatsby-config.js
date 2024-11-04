require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})
const { createProxyMiddleware } = require('http-proxy-middleware')

const contentfulConfig = {
  spaceId: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  environment: process.env.CONTENTFUL_ENVIRONMENT || 'master',
  enableTags: true,
  pageLimit: 50,
}

const { spaceId, accessToken } = contentfulConfig

if (!spaceId || !accessToken) {
  throw new Error(
    'Contentful spaceId and the access token need to be provided.'
  )
}

const gtmId = process.env.GATSBY_GOOGLE_TAG_MANAGER_ID

if (!gtmId && process.env.NODE_ENV === 'production') {
  throw new Error('Google Tag Manager ID is required.')
}

module.exports = {
  plugins: [
    {
      resolve: 'gatsby-source-contentful',
      options: contentfulConfig,
    },
    'gatsby-plugin-image',
    'gatsby-plugin-sass',
    'gatsby-plugin-remove-console',
    'gatsby-transformer-remark',
    {
      resolve: 'gatsby-plugin-google-tagmanager',
      options: {
        id: gtmId,
        includeInDevelopment: false,
      },
    },
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        excludes: [
          '/contact/complete/',
          '/contact/error/',
          '/entry/complete/',
          '/entry/error/',
        ],
        query: `
        {
          allSitePage {
            nodes {
              path
            }
          }
          site {
            siteMetadata {
              siteUrl
            }
            buildTime
          }
        }`,
        resolveSiteUrl: ({
          site: {
            siteMetadata: { siteUrl },
          },
        }) => process.env.GATSBY_SITE_URL || siteUrl,
        resolvePages: ({
          allSitePage: { nodes: allPages },
          site: { buildTime },
        }) => {
          return allPages.map((page) => {
            return { ...page, buildTime }
          })
        },
        serialize: ({ path, buildTime }) => ({
          url: path,
          lastmod: buildTime,
        }),
      },
    },
  ],
  developMiddleware: (app) => {
    app.use(
      '/index.php',
      createProxyMiddleware({
        target: process.env.GATSBY_SITE_API_CONTACT || '/',
        changeOrigin: true,
      })
    )
  },
}
