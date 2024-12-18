import React from 'react';
import { prepareForParse } from '../utils/utils';
import { parseHtmlToReact } from '../utils/htmlToReactParser';
import { Layout } from './Layout';
export { Head } from './Head';

export const ArticleList = ({ data, pageContext }) => {
  const { htmlBody, htmlScript, componentData } = prepareForParse({
    template: data.contentfulTemplate,
    data,
    pageContext,
  });

  return (
    <Layout body={parseHtmlToReact(htmlBody, componentData)} script={parseHtmlToReact(htmlScript, componentData)} />
  );
};
