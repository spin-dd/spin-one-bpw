import React from 'react';
import { parseHtmlToReact, prepareForParse } from '../utils.js';
import { Layout } from './Layout.js';

export { Head } from './Head.js';

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
