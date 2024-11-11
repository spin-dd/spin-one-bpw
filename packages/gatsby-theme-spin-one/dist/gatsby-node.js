"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const common_1 = require("./src/utils/common");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
console.info('theme gatsby-node.ts loaded');
let allLocales = [];
let defaultLocaleCode = 'ja';
const initializeLocales = async () => {
    allLocales = (await (0, common_1.getContentfulAllLocales)()) ?? [];
    defaultLocaleCode = (0, common_1.getContentfulDefaultLocaleCode)(allLocales);
};
initializeLocales().then(() => {
    const createPages = async ({ graphql, actions, reporter }, themeOptions) => {
        const { overrideGatsbyNode = false } = themeOptions;
        // Gatsby theme では gatsby-node を上書きできないため独自実装
        if (overrideGatsbyNode) {
            return;
        }
        try {
            await generatePages({ graphql, actions });
            await generateInformationPages({ graphql, actions });
        }
        catch (error) {
            reporter.panicOnBuild(`There was an error loading your Contentful posts`, error);
            return;
        }
    };
    module.exports = {
        createPages,
    };
});
const createPages = async ({ graphql, actions, reporter }, themeOptions) => {
    const { overrideGatsbyNode = false } = themeOptions;
    // Gatsby theme では gatsby-node を上書きできないため独自実装
    if (overrideGatsbyNode) {
        return;
    }
    try {
        await generatePages({ graphql, actions });
        await generateInformationPages({ graphql, actions });
    }
    catch (error) {
        reporter.panicOnBuild(`There was an error loading your Contentful posts`, error);
        return;
    }
};
// Contentful Page からのページ生成
const generatePages = async ({ graphql, actions }) => {
    const { createPage } = actions;
    const result = await graphql(`
    {
      allContentfulPage {
        nodes {
          contentful_id
          __typename
          pagePath
          node_locale
          body {
            raw
          }
          context {
            internal {
              content
            }
          }
        }
      }
    }
  `);
    if (result.errors) {
        throw result.errors;
    }
    const pages = result.data.allContentfulPage.nodes;
    if (pages.length > 0) {
        pages.forEach((page) => {
            const body = page.body?.raw ?? '';
            if (body === '') {
                // 該当 locale のページがない場合
                return;
            }
            const context = (0, common_1.parseJson)(page.context?.internal?.content) ?? {};
            createPage({
                path: `${(0, common_1.resolveLocalePath)(page.node_locale, defaultLocaleCode)}${page.pagePath}`,
                component: path_1.default.resolve('./src/templates/page.js'),
                context: {
                    locales: allLocales,
                    pagePath: page.pagePath,
                    locale: page.node_locale,
                    // Page context に指定がない場合全件ヒットするのを防止する
                    tag: '',
                    ...context,
                },
            });
        });
    }
    else {
        console.info('No Page Content found');
    }
};
// お知らせページ prefixPath
const informationPrefixPath = '/information';
// locale を含まないお知らせページの pagePath を生成
const createInformationCanonicalPathPath = ({ slug }) => `${informationPrefixPath}/${slug}/`;
const createInformationPagePath = ({ node_locale, slug }) => `${(0, common_1.resolveLocalePath)(node_locale, defaultLocaleCode)}${createInformationCanonicalPathPath({
    slug,
})}`;
// Contentful Information からのページ生成
const generateInformationPages = async ({ graphql, actions }) => {
    const { createPage } = actions;
    const result = await graphql(`
    {
      allContentfulInformation {
        nodes {
          contentful_id
          __typename
          node_locale
          slug
          body {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
  `);
    if (result.errors) {
        throw result.errors;
    }
    const information = result.data.allContentfulInformation.nodes;
    if (information.length > 0) {
        information.forEach((page) => {
            const body = page.body?.childMarkdownRemark.html ?? '';
            if (body === '') {
                // 該当 locale のページがない場合
                console.info('No Information Content Body found');
                return;
            }
            createPage({
                path: createInformationPagePath(page),
                component: path_1.default.resolve('./src/templates/informationDetail.js'),
                context: {
                    locales: allLocales,
                    name: 'informationDetail',
                    locale: page.node_locale,
                    slug: page.slug,
                    // customToggleButton 用
                    pagePath: createInformationCanonicalPathPath(page),
                },
            });
        });
    }
    else {
        console.info('No Information Content found');
    }
};
module.exports = {
    createPages,
};
