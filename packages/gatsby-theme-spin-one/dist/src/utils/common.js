"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveLocalePath = exports.getContentfulSecondLocaleCode = exports.getContentfulDefaultLocaleCode = exports.getContentfulAllLocales = exports.parseJson = void 0;
const contentful = __importStar(require("contentful"));
// サイト全体のデフォルトロケールコード
const DEFAULT_LOCALE_CODE = 'ja';
const SECOND_LOCALE_CODE = 'en';
const parseJson = (json = '{}') => {
    try {
        return JSON.parse(json);
    }
    catch (e) {
        console.error('JSON parse error', e);
        return null;
    }
};
exports.parseJson = parseJson;
// Contentful で設定済みのロケールをすべて取得する
const getContentfulAllLocales = async () => {
    const client = contentful.createClient({
        space: process.env.CONTENTFUL_SPACE_ID,
        environment: process.env.CONTENTFUL_ENVIRONMENT_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
    });
    try {
        const space = await client.getSpace();
        return space.locales;
    }
    catch (error) {
        console.error('Error fetching locales:', error);
        return [];
    }
};
exports.getContentfulAllLocales = getContentfulAllLocales;
// Contentful で設定済みのデフォルトロケールを取得する
const getContentfulDefaultLocaleCode = (locales = []) => locales.find((locale) => locale.default)?.code || DEFAULT_LOCALE_CODE;
exports.getContentfulDefaultLocaleCode = getContentfulDefaultLocaleCode;
// Contentful で設定済みのデフォルトではないロケールのうち最初のロケールを取得する
const getContentfulSecondLocaleCode = (locales = []) => locales.find((locale) => !locale.default)?.code || SECOND_LOCALE_CODE;
exports.getContentfulSecondLocaleCode = getContentfulSecondLocaleCode;
// ロケールに基づいてパスを解決する
const resolveLocalePath = (locale, defaultLocaleCode) => locale === defaultLocaleCode ? '' : `/${locale}`;
exports.resolveLocalePath = resolveLocalePath;
