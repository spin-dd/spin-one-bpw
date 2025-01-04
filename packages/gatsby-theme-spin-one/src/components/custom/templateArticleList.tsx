import React from 'react';
import { prepareForParse, parseHtmlToReact } from '../../utils';

function CustomTemplateArticleList({
  data: { pageContext, ...pageData },
  // component props
  tagName = 'ul',
  className = '',
  // parseHtmlToReactでComponent entryがテンプレートとしてI/Fされる
  template,
}) {
  // templateとpageData.allContentfulArticleから一覧要素を生成する
  const itemElements = pageData.allContentfulArticle.nodes.map((node, index) => {
    const { htmlBody, componentData } = prepareForParse({
      template,
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

export { CustomTemplateArticleList };
