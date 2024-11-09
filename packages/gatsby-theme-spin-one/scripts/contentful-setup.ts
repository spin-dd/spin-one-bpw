#!/usr/bin/env node

import { createClient } from 'contentful-management';
import contentfulImport from 'contentful-import';
// SPIN ONE標準Content Model
import content from '../data/contentful/content-model.json';
// envファイルに設定した情報を読み込む
import { config } from 'dotenv';
config();

const spaceId = process.env.CONTENTFUL_SPACE_ID as string;
const managementToken = process.env.CONTENTFUL_MANAGEMENT_TOKEN as string;
const environmentId = process.env.CONTENTFUL_ENVIRONMENT_ID as string;

console.log('Setting up Contentful with the following config:');
console.log('Space ID:', spaceId);
console.log('Environment ID:', environmentId);
console.log('CMA Token:', managementToken.slice(0, -5).replace(/./g, '*') + managementToken.slice(-5));

if (!spaceId || !managementToken || !environmentId) {
  console.error('Missing required environment variables');
  process.exit(1);
}

const client = createClient({
  accessToken: managementToken,
});

async function setupContentful() {
  try {
    const space = await client.getSpace(spaceId);
    console.log(`Using space: ${spaceId}`);

    // 環境の存在確認
    const environments = await space.getEnvironments();
    if (environments.items.some((env) => env.sys.id === environmentId)) {
      console.log(`Environment already exists: ${environmentId}`);
      return;
    }

    // 環境を作成し、再度取得して存在を確認
    await space.createEnvironmentWithId(environmentId, { name: environmentId });
    const createdEnvironment = await space.getEnvironment(environmentId);
    console.log(`Environment created: ${createdEnvironment.sys.id}`);

    // SPIN-ONE標準Content Modelをインポート
    await contentfulImport({
      spaceId,
      environmentId,
      managementToken,
      content,
      contentModelOnly: true,
    });
  } catch (error) {
    console.error('Error setting up Contentful:', error);
    process.exit(1);
  }
}

setupContentful();
