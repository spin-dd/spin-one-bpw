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
        // お知らせページのプレフィックスパスを指定する例
        informationPrefixPath: "/news",
      },
    },
  ],
};

export default config;
