import React from 'react';
import { prepareForParse, parseHtmlToReact } from '../utils';

export const Head = ({ data, pageContext, children }) => {
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
