import React from 'react';
import { prepareForParse, parseHtmlToReact } from '../utils';

export const Head = ({ data, pageContext, children }) => {
  // 指定したテンプレートが存在しない場合
  if (!data.contentfulTemplate) {
    return null;
  }

  const { htmlHead, componentData } = prepareForParse({
    template: data.contentfulTemplate,
    data,
    pageContext,
  });

  return (
    <>
      <React.Fragment key="head_children">{children}</React.Fragment>
      {parseHtmlToReact(htmlHead, componentData)}
    </>
  );
};
