import React from 'react';
import { prepareForParse, parseHtmlToReact } from '../utils';
import { Layout } from './Layout';
import type { PageProps } from 'gatsby';

export { Head } from './Head';

export const ArticleList: React.FC<
  PageProps<
    {
      template: Queries.ContentfulTemplate;
      allContentfulArticle: Pick<Queries.ContentfulArticleConnection, 'nodes' | 'pageInfo'>;
    } & Queries.AllContentfulEntryFragmentFragment
  >
> = ({ data, pageContext }) => {
  const { template } = data;
  // 指定したテンプレートが存在しない場合
  if (!template) {
    return null;
  }

  const { htmlBody, htmlScript, componentData } = prepareForParse({
    template,
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
