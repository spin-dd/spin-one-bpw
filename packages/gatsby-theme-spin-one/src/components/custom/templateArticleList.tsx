import React from 'react';
import { prepareForParse, parseHtmlToReact } from '../../utils';

// Contentful Template内で使用する記事一覧コンポーネント
// generateArticleListPage.ts内でテンプレートに指定しているContentfulのArticleListPage Templateのbody内で使用されている
function CustomTemplateArticleList({
  data: { pageContext, ...pageData },
  // parseHtmlToReactでComponent entryがテンプレートとしてI/Fされる
  template,
  // component props
  tagName = 'ul',
  className = '',
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
