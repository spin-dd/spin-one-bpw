import fs from 'fs';
export { parseJson } from '../src/utils/common';

// ロケールに基づいてパスを解決する
export const resolveLocalePath = (locale: string, defaultLocaleCode: string): string =>
  locale === defaultLocaleCode ? '' : `/${locale}`;

// ページ生成に使うテンプレートファイルのパスを動的に決定する関数
// サイト側にテンプレートファイルが存在する場合はそちらを優先する
export const resolveTemplatePath = (sitePath: string, themePath: string): string => {
  return fs.existsSync(sitePath) ? sitePath : themePath;
};
