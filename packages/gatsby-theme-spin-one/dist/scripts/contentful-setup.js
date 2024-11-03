#!/usr/bin/env node
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const contentful_management_1 = require("contentful-management");
const contentful_import_1 = __importDefault(require("contentful-import"));
// envファイルに設定した情報を読み込む
(0, dotenv_1.config)();
const spaceId = process.env.CONTENTFUL_SPACE_ID;
const managementToken = process.env.CONTENTFUL_MANAGEMENT_TOKEN;
const environmentId = process.env.CONTENTFUL_ENVIRONMENT_ID;
if (!spaceId || !managementToken || !environmentId) {
    console.error('Contentfulの設定が不足しています。');
    process.exit(1);
}
const client = (0, contentful_management_1.createClient)({
    accessToken: managementToken,
});
async function setupContentful() {
    try {
        const space = await client.getSpace(spaceId);
        // スペースを使用
        console.log(`Using space: ${spaceId}`);
        // 環境を作成
        await space.createEnvironmentWithId(environmentId, { name: environmentId });
        console.log(`Environment created: ${environmentId}`);
        // SPIN ONE標準Content Modelをインポート
        Promise.resolve().then(() => __importStar(require('../data/contentful/content-model.json'))).then(async (content) => {
            await (0, contentful_import_1.default)({
                spaceId,
                environmentId,
                managementToken,
                content,
                contentModelOnly: true,
            });
        });
        console.log('Content model imported successfully');
    }
    catch (error) {
        console.error('Error setting up Contentful:', error);
        process.exit(1);
    }
}
setupContentful();
