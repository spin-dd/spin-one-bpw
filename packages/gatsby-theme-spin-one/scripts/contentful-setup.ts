#!/usr/bin/env node

import { config } from 'dotenv';
import { createClient } from 'contentful-management';
import contentfulImport from 'contentful-import';

// SPIN ONE標準Content Model
import content from '../data/contentful/content-model.json';

// envファイルに設定した情報を読み込む
config();

const spaceId = process.env.CONTENTFUL_SPACE_ID as string;
const managementToken = process.env.CONTENTFUL_MANAGEMENT_TOKEN as string;
const environmentId = process.env.CONTENTFUL_ENVIRONMENT_ID as string;

if (!spaceId || !managementToken || !environmentId) {
  console.error('Contentfulの設定が不足しています。');
  process.exit(1);
}

const client = createClient({
  accessToken: managementToken,
});

async function setupContentful() {
  try {
    const space = await client.getSpace(spaceId);

    // スペースを使用
    console.log(`Using space: ${spaceId}`);

    // 環境の存在確認
    const environments = await space.getEnvironments();
    if (environments.items.some((env) => env.sys.id === environmentId)) {
      console.log(`Environment already exists: ${environmentId}`);
      return;
    }

    // 環境を作成
    await space.createEnvironmentWithId(environmentId, { name: environmentId });
    console.log(`Environment created: ${environmentId}`);

    // SPIN ONE標準Content Modelをインポート
    await contentfulImport({
      spaceId,
      environmentId,
      managementToken,
      content,
      contentModelOnly: true,
    });
    console.log('Content model imported successfully');
  } catch (error) {
    console.error('Error setting up Contentful:', error);
    process.exit(1);
  }
}

setupContentful();
