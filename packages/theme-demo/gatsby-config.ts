import type { GatsbyConfig } from "gatsby";
import dotenv from "dotenv";
dotenv.config();

console.info("site gatsby-config.ts loaded");

const config: GatsbyConfig = {
  siteMetadata: {
    title: `theme-demo`,
    siteUrl: `https://one.spin-dd.com`,
  },
  graphqlTypegen: true,
  plugins: [
    {
      resolve: "@spin-dd/gatsby-theme-spin-one",
      options: {
        // お知らせページのプレフィックスパスを指定する例
        informationPrefixPath: "/news",
      },
    },
  ],
};

export default config;
