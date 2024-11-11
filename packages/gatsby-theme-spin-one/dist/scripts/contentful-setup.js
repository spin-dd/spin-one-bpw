#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const contentful_management_1 = require("contentful-management");
const contentful_import_1 = __importDefault(require("contentful-import"));
// SPIN-ONE標準Content Model
const content_model_json_1 = __importDefault(require("../data/contentful/content-model.json"));
// envファイルに設定した情報を読み込む
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const spaceId = process.env.CONTENTFUL_SPACE_ID;
const managementToken = process.env.CONTENTFUL_MANAGEMENT_TOKEN;
const environmentId = process.env.CONTENTFUL_ENVIRONMENT_ID;
console.log('Setting up Contentful with the following config:');
console.log('Space ID:', spaceId);
console.log('Environment ID:', environmentId);
console.log('CMA Token:', managementToken.slice(0, -5).replace(/./g, '*') + managementToken.slice(-5));
if (!spaceId || !managementToken || !environmentId) {
    console.error('Missing required environment variables');
    process.exit(1);
}
const client = (0, contentful_management_1.createClient)({
    accessToken: managementToken,
});
async function setupContentful() {
    try {
        const space = await client.getSpace(spaceId);
        console.log(`Using space: ${spaceId}`);
        // environmentの存在確認
        const environments = await space.getEnvironments();
        if (environments.items.some((env) => env.sys.id === environmentId)) {
            console.log(`Environment already exists: ${environmentId}`);
            return;
        }
        // environmentを作成
        await space.createEnvironmentWithId(environmentId, { name: environmentId });
        console.log(`Environment created: ${environmentId}`);
        // environmentの処理が完了するまで待機
        // @see https://www.contentful.com/developers/docs/tutorials/general/continuous-integration-with-circleci/
        console.log('Waiting for environment processing...');
        const DELAY = 1000;
        const MAX_NUMBER_OF_TRIES = 5;
        let count = 0;
        let environment = await space.getEnvironment(environmentId);
        while (count < MAX_NUMBER_OF_TRIES) {
            environment = await space.getEnvironment(environmentId);
            const status = environment.sys.status.sys.id;
            if (status === 'ready' || status === 'failed') {
                if (status === 'ready') {
                    console.log(`Successfully processed new environment (${environmentId})`);
                }
                else {
                    console.log('Environment creation failed');
                }
                break;
            }
            await new Promise((resolve) => setTimeout(resolve, DELAY));
            count++;
        }
        // デフォルトlocaleをjaに変更
        const defaultLocaleCode = 'ja';
        const locales = await environment.getLocales();
        const defaultLocale = locales.items.find((locale) => locale.default);
        if (!defaultLocale) {
            console.error('Default locale not found');
            throw new Error('Default locale not found');
        }
        if (defaultLocale && defaultLocale.code !== defaultLocaleCode) {
            defaultLocale.code = defaultLocaleCode;
            await defaultLocale.update();
            console.log(`Default locale changed to: ${defaultLocaleCode}`);
        }
        // SPIN-ONE標準Content Modelをインポート
        await (0, contentful_import_1.default)({
            spaceId,
            environmentId,
            managementToken,
            content: content_model_json_1.default,
            contentModelOnly: true,
        });
    }
    catch (error) {
        console.error('Error setting up Contentful:', error);
        process.exit(1);
    }
}
setupContentful();
