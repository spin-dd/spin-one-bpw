import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: `theme-demo`,
    siteUrl: `https://one.spin-dd.com`,
  },
  graphqlTypegen: true,
  plugins: [
    "gatsby-plugin-typescript",
    {
      resolve: "@spin-dd/gatsby-theme-spin-one",
      options: {},
    },
  ],
};

export default config;
