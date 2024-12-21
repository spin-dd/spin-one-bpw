import React from 'react';
import { prepareForParse, parseHtmlToReact } from '../../utils';

function CustomArticleList({
  data: { pageContext, ...pageData },
  // component props
  tagName = 'ul',
  className = '',
  pagerClassName = '',
  entry,
}) {
  // entry（moduleName: CustomArticleListのComponent）をテンプレートとして
  // pageData.allContentfulArticleから一覧要素を生成する
  const itemElements = pageData.allContentfulArticle.nodes.map((node, index) => {
    const { htmlBody, componentData } = prepareForParse({
      template: entry,
      data: {
        ...pageData,
        contentfulArticle: node,
      },
      pageContext: {
        ...pageContext,
        pagerClassName,
      },
    });

    return <React.Fragment key={index}>{parseHtmlToReact(htmlBody, componentData)}</React.Fragment>;
  });
  return React.createElement(tagName, { className }, itemElements);
}

export { CustomArticleList };
