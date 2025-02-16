import type { GatsbyConfig } from "gatsby";
import dotenv from "dotenv";

dotenv.config();

console.info("site gatsby-config.ts loaded");

const config: GatsbyConfig = {
  siteMetadata: {
    title: `theme-demo`,
    siteUrl: `https://one.spin-dd.com`,
  },
  graphqlTypegen: {
    generateOnBuild: true,
  },
  plugins: [
    "gatsby-plugin-typescript",
    {
      resolve: "@spin-dd/gatsby-theme-spin-one",
      // theme options
      options: {
        // FIXME: 少ない記事での動作テストのため一覧あたりの記事数を抑える
        articlesPerPage: 2,
      },
    },
  ],
};

// theme-demoでschema.gqlを更新し、develop/buildのpost処理として
// gatsby-theme-spin-oneのschema.gqlにコピーする
if (process.env.GATSBY_UPDATE_SCHEMA_SNAPSHOT) {
  config.plugins?.push("gatsby-plugin-schema-snapshot");
}

export default config;
