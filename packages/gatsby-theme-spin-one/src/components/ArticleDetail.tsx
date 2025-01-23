import React from 'react';
import { prepareForParse, parseHtmlToReact } from '../utils';
import { Layout } from './Layout';
import { Head as HeadBase } from './Head';
import type { HeadProps, PageProps } from 'gatsby';

export const Head = (
  props: HeadProps<
    {
      template: Queries.ContentfulTemplate;
      contentfulArticle: Queries.ContentfulArticle;
    } & Queries.AllContentfulEntryFragmentFragment
  >,
) => {
  const {
    data: { contentfulArticle },
  } = props;
  const { title } = contentfulArticle;

  return (
    <>
      <HeadBase {...props} />
      {title !== '' && <title key="title">{title}</title>}
    </>
  );
};

export const ArticleDetail: React.FC<
  PageProps<
    {
      template: Queries.ContentfulTemplate;
      contentfulArticle: Queries.ContentfulArticle;
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
    pageContext,
  });

  return (
    <Layout body={parseHtmlToReact(htmlBody, componentData)} script={parseHtmlToReact(htmlScript, componentData)} />
  );
};
