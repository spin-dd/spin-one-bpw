import React from 'react';
import { prepareForParse, parseHtmlToReact } from '../utils';
import { Layout } from './Layout';

export { Head } from './Head';

export const ArticleList = ({ data, pageContext }) => {
  // 指定したテンプレートが存在しない場合
  if (!data.contentfulTemplate) {
    return null;
  }

  const { htmlBody, htmlScript, componentData } = prepareForParse({
    template: data.contentfulTemplate,
    data,
    pageContext: {
      ...pageContext,
      // ページネーションのためのデータを追加
      pageInfo: data.allContentfulArticle.pageInfo,
    },
  });

  return (
    <Layout body={parseHtmlToReact(htmlBody, componentData)} script={parseHtmlToReact(htmlScript, componentData)} />
  );
};
