import React from 'react';
import { prepareForParse } from '../utils/utils';
import { parseHtmlToReact } from '../utils/htmlToReactParser';
import { Layout } from './Layout';
import { Head as HeadBase } from './Head';

export const Head = (props) => {
  const { data } = props;
  const title = data.contentfulArticle.title;
  return <HeadBase {...props}>{title !== '' && <title key="title">{title}</title>}</HeadBase>;
};

export const ArticleDetail = ({ data, pageContext }) => {
  const { htmlBody, htmlScript, componentData } = prepareForParse({
    template: data.contentfulTemplate,
    data,
    pageContext,
  });

  return (
    <Layout body={parseHtmlToReact(htmlBody, componentData)} script={parseHtmlToReact(htmlScript, componentData)} />
  );
};
