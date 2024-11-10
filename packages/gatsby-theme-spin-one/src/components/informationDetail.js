import React from 'react';
import { parseHtmlToReact, parseJson, prepareForParse } from '../utils/utils';
import { Layout } from './Layout';
import { Head as HeadBase } from './Head';

export const Head = (props) => {
  const { data } = props;
  const title = data.contentfulInformation.title;
  return <HeadBase {...props}>{title !== '' && <title key="title">{title}</title>}</HeadBase>;
};

export const InformationDetail = ({ data, pageContext }) => {
  // FIXME: contentfulInformation からの依存脱却
  const information = data.contentfulInformation;

  // Template props に定義された値を data.context にマージして
  // CustomTemplateText で参照可能にする
  const { categoryList = {}, departmentList = {} } =
    parseJson(data.contentfulTemplate.context?.internal?.content) ?? {};

  const { htmlBody, htmlScript, componentData } = prepareForParse({
    template: data.contentfulTemplate,
    data: {
      ...data,
      context: {
        categoryName: categoryList?.[information.label],
        departmentLink: departmentList?.[information.departmentLabel],
      },
    },
    pageContext,
  });

  return (
    <Layout body={parseHtmlToReact(htmlBody, componentData)} script={parseHtmlToReact(htmlScript, componentData)} />
  );
};
