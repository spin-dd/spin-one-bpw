import type { GatsbyConfig } from 'gatsby';
import dotenv from 'dotenv';
dotenv.config();

const contentfulConfig = {
  spaceId: process.env.CONTENTFUL_SPACE_ID as string,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string,
  environment: process.env.CONTENTFUL_ENVIRONMENT_ID || 'master',
  enableTags: true,
  pageLimit: 50,
};

const { spaceId, accessToken } = contentfulConfig;

if (!spaceId || !accessToken) {
  throw new Error('Contentful spaceId and the access token need to be provided.');
}

const config: GatsbyConfig = {
  plugins: [
    'gatsby-plugin-typescript',
    {
      resolve: 'gatsby-source-contentful',
      options: contentfulConfig,
    },
    'gatsby-plugin-image',
    'gatsby-plugin-sass',
    'gatsby-transformer-remark',
  ],
  graphqlTypegen: true,
};

const gtmId = process.env.GATSBY_GOOGLE_TAG_MANAGER_ID;
if (!gtmId) {
  console.info('Google Tag Manager ID is not set.');
} else {
  config.plugins?.push({
    resolve: 'gatsby-plugin-google-tagmanager',
    options: {
      id: gtmId,
      includeInDevelopment: false,
    },
  });
}

export default config;
