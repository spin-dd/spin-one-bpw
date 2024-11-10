import React from 'react';
import { parseHtmlToReact, prepareForParse } from '../utils/utils';
import { Layout } from './Layout';

export { Head } from './Head';

export const Page = ({ data, pageContext }) => {
  const { htmlBody, htmlScript, componentData } = prepareForParse({
    template: data.contentfulTemplate,
    data,
    pageContext,
  });

  return (
    <Layout
      body={parseHtmlToReact(htmlBody, componentData, data)}
      script={parseHtmlToReact(htmlScript, componentData, data)}
    />
  );
};
