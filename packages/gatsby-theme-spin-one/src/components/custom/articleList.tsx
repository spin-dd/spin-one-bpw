import React from 'react';
import { prepareForParse } from '../../utils/utils';
import { parseHtmlToReact } from '../../utils/htmlToReactParser';

function CustomArticleList({
  data: { pageContext, ...pageData },
  // component props
  tagName = 'ul',
  className = '',
  entry,
}) {
  // entryをテンプレートとしてpageData.allContentfulArticleから一覧要素を生成する
  const itemElements = pageData.allContentfulArticle.nodes.map((node, index) => {
    const { htmlBody, componentData } = prepareForParse({
      template: entry,
      data: {
        ...pageData,
        contentfulArticle: node,
      },
      pageContext,
    });

    return <React.Fragment key={index}>{parseHtmlToReact(htmlBody, componentData)}</React.Fragment>;
  });
  return React.createElement(tagName, { className }, itemElements);
}

export { CustomArticleList };
