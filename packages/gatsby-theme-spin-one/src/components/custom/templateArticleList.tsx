import React from 'react';
import { prepareForParse, parseHtmlToReact } from '../../utils';
import type { ComponentProps } from '../../..';

// Contentful Template内で使用する記事一覧コンポーネント
// generateArticleListPage.ts内でテンプレートに指定しているContentfulのArticleListPage Templateのbody内で使用されている
export const CustomTemplateArticleList: React.FC<
  ComponentProps<{
    template: Queries.ContentfulComponent;
    allContentfulArticle: Pick<Queries.ContentfulArticleConnection, 'nodes' | 'pageInfo'>;
  }> & { tagName?: string; className?: string }
> = ({
  data: {
    // parseHtmlToReactでComponent entryがテンプレートとしてI/Fされる
    template,
    ...pageData
  },
  pageContext,
  // component props
  tagName = 'ul',
  className = '',
}) => {
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
};
