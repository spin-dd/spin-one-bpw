import React from 'react';
import { prepareForParse, parseHtmlToReact } from '../utils';
import { Layout } from './Layout';
import type { PageProps } from 'gatsby';

export { Head } from './Head';

export const Page: React.FC<
  PageProps<{ template: Queries.ContentfulPage } & Queries.AllContentfulEntryFragmentFragment>
> = ({ data, pageContext }) => {
  const { template } = data;
  // 指定したテンプレートが存在しない場合
  if (!template) {
    return null;
  }

  const { htmlBody, htmlScript, componentData } = prepareForParse({
    template,
    data,
    pageContext,
  });

  return (
    <Layout body={parseHtmlToReact(htmlBody, componentData)} script={parseHtmlToReact(htmlScript, componentData)} />
  );
};
