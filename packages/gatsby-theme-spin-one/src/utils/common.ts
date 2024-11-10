import * as contentful from 'contentful';

// サイト全体のデフォルトロケールコード
const DEFAULT_LOCALE_CODE = 'ja';
const SECOND_LOCALE_CODE = 'en';

export const parseJson = (json = '') => {
  try {
    return JSON.parse(json);
  } catch (e) {
    console.error('JSON parse error', e);
    return null;
  }
};

// Contentful で設定済みのロケールをすべて取得する
export const getContentfulAllLocales = async (): Promise<Omit<contentful.Locale, 'sys'>[]> => {
  const client = contentful.createClient({
    space: process.env.CONTENTFUL_SPACE_ID as string,
    environment: process.env.CONTENTFUL_ENVIRONMENT_ID as string,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string,
  });

  try {
    const space = await client.getSpace();
    return space.locales;
  } catch (error) {
    console.error('Error fetching locales:', error);
    return [];
  }
};

// Contentful で設定済みのデフォルトロケールを取得する
export const getContentfulDefaultLocaleCode = (locales: Omit<contentful.Locale, 'sys'>[] = []): string =>
  locales.find((locale) => locale.default)?.code || DEFAULT_LOCALE_CODE;

// Contentful で設定済みのデフォルトではないロケールのうち最初のロケールを取得する
export const getContentfulSecondLocaleCode = (locales: contentful.Locale[] = []): string =>
  locales.find((locale) => !locale.default)?.code || SECOND_LOCALE_CODE;

// ロケールに基づいてパスを解決する
export const resolveLocalePath = (locale: string, defaultLocaleCode: string): string =>
  locale === defaultLocaleCode ? '' : `/${locale}`;
