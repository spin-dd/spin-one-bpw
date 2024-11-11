#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const node_html_parser_1 = require("node-html-parser");
const contentful_management_1 = __importDefault(require("contentful-management"));
const mime_1 = __importDefault(require("mime"));
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
// envファイルに設定した情報を読み込む
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const spaceId = process.env.CONTENTFUL_SPACE_ID;
const managementToken = process.env.CONTENTFUL_MANAGEMENT_TOKEN;
const environmentId = process.env.CONTENTFUL_ENVIRONMENT_ID;
console.log('Sync media with the following config:');
console.log('Space ID:', spaceId);
console.log('Environment ID:', environmentId);
console.log('CMA Token:', managementToken.slice(0, -5).replace(/./g, '*') + managementToken.slice(-5));
if (!spaceId || !managementToken || !environmentId) {
    console.error('Contentfulの設定が不足しています。');
    process.exit(1);
}
const client = contentful_management_1.default.createClient({
    accessToken: managementToken,
});
async function main() {
    const space = await client.getSpace(spaceId);
    const environment = await space.getEnvironment(environmentId);
    // Contentful に画像をアップロードし、アセットを作成する関数
    async function createAsset(imageInfo, directory) {
        // 対象画像ファイル
        const fileName = path_1.default.basename(imageInfo.src);
        const relativePath = path_1.default.relative(directory, imageInfo.src);
        // directoryからの相対パスをハッシュ化してアセットのIDとして使用する
        const assetId = (0, crypto_1.createHash)('sha256').update(relativePath).digest('hex');
        // 登録済みか確認
        const assets = await environment
            .getAssets({
            'sys.id': assetId,
            // ハッシュを指定して画像ファイルの更新を検知する
            'fields.description': imageInfo.hash,
        })
            .catch((error) => {
            console.error({ error });
            return { items: [] };
        });
        if (assets.items.length > 0) {
            console.info(`更新がありませんでしたのでスキップします: ${relativePath} with hash: ${imageInfo.hash}`);
            return assets.items[0].sys.id;
        }
        // ファイルタイプの取得
        const contentType = mime_1.default.getType(imageInfo.src);
        if (!contentType) {
            console.error(`ファイルタイプが不明です。アセット登録をスキップします: ${relativePath}`);
            return;
        }
        // 画像をアップロード
        const fd = await promises_1.default.open(imageInfo.src, 'r');
        const upload = await environment
            .createUpload({
            file: await fd.readFile(),
        })
            .finally(() => fd.close())
            .catch((error) => {
            console.error({ error });
            return undefined;
        });
        if (!upload) {
            console.error(`アップロードに失敗しました: ${relativePath}`);
            return undefined;
        }
        // アセットを作成
        const asset = await environment.createAssetWithId(assetId, {
            fields: {
                title: {
                    // デフォルト言語のみ設定
                    // TODO: 仕様確認が必要
                    ja: fileName,
                },
                file: {
                    ja: {
                        fileName,
                        contentType,
                        uploadFrom: {
                            sys: {
                                type: 'Link',
                                linkType: 'Upload',
                                id: upload.sys.id,
                            },
                        },
                    },
                },
                description: {
                    ja: imageInfo.hash,
                },
            },
        });
        // アセットを処理（公開はしない）
        await asset.processForAllLocales();
        console.info(`アセットを作成しました: ${relativePath} with hash: ${imageInfo.hash}`);
        return asset.sys.id;
    }
    // ディレクトリ内のHTMLファイルを再帰的に取得する関数
    async function findHtmlFiles(directory) {
        const htmlFiles = [];
        const walk = async (dir) => {
            const dirents = await promises_1.default.readdir(dir, { withFileTypes: true });
            for await (const dirent of dirents) {
                const fullPath = path_1.default.join(dir, dirent.name);
                if (dirent.isDirectory()) {
                    await walk(fullPath);
                }
                else if (path_1.default.extname(fullPath) === '.html') {
                    htmlFiles.push(fullPath);
                }
            }
        };
        await walk(directory);
        return htmlFiles;
    }
    // html ファイルを入力に img タグに指定されたローカル画像をContentfulに登録する関数
    // 画像はハッシュ化して重複を除去
    async function processHtmlFiles(htmlFiles, directory) {
        // 画像のコンテンツのハッシュと画像情報の対応表
        const imageInfoMap = new Map();
        for await (const htmlFile of htmlFiles) {
            const content = await promises_1.default.readFile(htmlFile, 'utf-8');
            const root = (0, node_html_parser_1.parse)(content);
            const images = root.querySelectorAll('img');
            // 各imgタグの処理
            for (const img of images) {
                const src = img.getAttribute('src');
                if (!src) {
                    continue;
                }
                const absoluteSrc = path_1.default.resolve(path_1.default.dirname(htmlFile), src);
                // 画像ファイルのコンテンツを取得してハッシュ化
                const imageContent = await promises_1.default.readFile(absoluteSrc);
                const hash = (0, crypto_1.createHash)('sha256').update(imageContent).digest('hex');
                const imageInfo = { src: absoluteSrc, hash };
                // アセット登録
                const key = `${absoluteSrc}:${hash}`;
                if (!imageInfoMap.has(key)) {
                    const assetId = await createAsset(imageInfo, directory);
                    if (!assetId) {
                        continue;
                    }
                    imageInfo.assetId = assetId;
                    // ファイルパスとファイル内容をキーにして、画像情報を管理
                    imageInfoMap.set(key, imageInfo);
                }
                const fileUrl = await environment
                    .getAsset(imageInfoMap.get(key).assetId)
                    .then((asset) => asset.fields.file.ja.url)
                    .catch((error) => {
                    console.error({ error });
                    return src;
                });
                // Pageモデルの登録がないためこの段階ではContentfulの配信URLに置換する仮実装
                if (fileUrl) {
                    img.setAttribute('src', fileUrl);
                }
            }
            // FIXME: 動作確認のため、出力（ファイル更新は行わない）
            console.log(root.toString());
        }
    }
    // 第一引数をディレクトリとして取得
    const directory = process.argv[2];
    if (!directory) {
        console.error('ディレクトリを指定してください。');
        process.exit(1);
    }
    // HTMLファイルのパスを取得
    const htmlFiles = await findHtmlFiles(directory);
    // 取得したHTMLファイルからimgタグに指定された画像情報を取得
    await processHtmlFiles(htmlFiles, directory);
}
main().catch((error) => {
    console.error('Error in main function:', error);
});
