import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: `theme-demo`,
    siteUrl: `https://one.spin-dd.com`,
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  // graphqlTypegen: true,
  plugins: [
    {
      resolve: "@spin-dd/gatsby-theme-spin-one",
      options: {},
    },
  ],
};

export default config;
