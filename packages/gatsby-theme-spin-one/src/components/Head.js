import React from 'react';
import { prepareForParse } from '../utils/utils';
import { parseHtmlToReact } from '../utils/htmlToReactParser';

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
