import type { GatsbyConfig } from "gatsby";

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
        // サイトのデフォルトlocaleを指定する
        defaultLocaleCode: "ja",
      },
    },
  ],
};

export default config;
