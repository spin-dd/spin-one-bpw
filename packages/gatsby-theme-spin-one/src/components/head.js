import React from 'react';
import { parseHtmlToReact, prepareForParse } from '../utils';

export const Head = ({ data, pageContext, children }) => {
  const { htmlHead, componentData } = prepareForParse({
    template: data.contentfulTemplate,
    data,
    pageContext,
  });

  return (
    <>
      <React.Fragment key="children">{children}</React.Fragment>
      {parseHtmlToReact(htmlHead, componentData)}
    </>
  );
};
