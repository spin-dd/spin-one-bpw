"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
console.info('theme gatsby-config.ts loaded');
const contentfulConfig = {
    spaceId: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
    environment: process.env.CONTENTFUL_ENVIRONMENT_ID || 'master',
    // enableTags: true,
    pageLimit: 50,
};
const { spaceId, accessToken } = contentfulConfig;
if (!spaceId || !accessToken) {
    throw new Error('Contentful spaceId and the access token need to be provided.');
}
const config = {
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
}
else {
    config.plugins?.push({
        resolve: 'gatsby-plugin-google-tagmanager',
        options: {
            id: gtmId,
            includeInDevelopment: false,
        },
    });
}
module.exports = config;
