import React from 'react';
import { prepareForParse, parseHtmlToReact } from '../../utils';
import { ComponentProps } from '../../..';

export const CustomArticleList: React.FC<
  ComponentProps<{
    template: Queries.ContentfulComponent;
    customAllContentfulArticle: Queries.ContentfulArticleConnection;
  }> & {
    tagName: string;
    className: string;
    filter: {
      type: string;
      category: string;
    };
    sort: {
      field: keyof Pick<Queries.ContentfulArticle, 'createdAt' | 'updatedAt' | 'publishDate'>;
      order: string;
    };
    limit: number;
    pageContext: object;
  }
> = ({
  data: { template, ...pageData },
  // parseHtmlToReactでComponent entryがテンプレートとしてI/Fされる
  // Contentful Component propsからの入力値
  tagName = 'ul',
  className = '',
  filter = {
    type: '',
    category: '',
  },
  sort = {
    field: 'createdAt',
    order: 'desc',
  },
  limit = 5,
  pageContext = {},
}) => {
  // propsからの入力値を元に、filterFunc, sortFuncを定義
  const filterFunc = (node: Queries.ContentfulArticle) => {
    return (
      (!filter.type || node.type?.slug === filter.type) && (!filter.category || node.category?.slug === filter.category)
    );
  };

  const sortFunc = (a: Queries.ContentfulArticle, b: Queries.ContentfulArticle) => {
    const aValue = a[sort.field];
    const bValue = b[sort.field];
    if (aValue == null || bValue == null) {
      return 0;
    }

    const dateA = new Date(aValue);
    const dateB = new Date(bValue);

    if (sort.order?.toLocaleLowerCase() === 'asc') {
      return dateA.getTime() - dateB.getTime();
    } else if (sort.order?.toLocaleLowerCase() === 'desc') {
      return dateB.getTime() - dateA.getTime();
    }

    return 0;
  };

  // filterFunc, sortFuncを適用し、limit数分の記事を取得してContentful Component bodyをテンプレートにして出力
  const itemElements = pageData.customAllContentfulArticle.nodes
    .filter(filterFunc)
    .sort(sortFunc)
    .slice(0, limit)
    .map((node, index) => {
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
