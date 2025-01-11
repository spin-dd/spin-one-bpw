import React from 'react';
import { prepareForParse, parseHtmlToReact } from '../../utils';

function CustomArticleList({
  data: { pageContext, ...pageData },
  // parseHtmlToReactでComponent entryがテンプレートとしてI/Fされる
  template,
  // component props
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
}) {
  const filterFunc = (node) => {
    return (
      (!filter.type || node.type.slug === filter.type) && (!filter.category || node.category.slug === filter.category)
    );
  };
  const sortFunc = (a, b) => {
    const dateA = new Date(a[sort.field]);
    const dateB = new Date(b[sort.field]);

    if (sort.order?.toLocaleLowerCase() === 'asc') {
      return dateA.getTime() - dateB.getTime();
    } else if (sort.order?.toLocaleLowerCase() === 'desc') {
      return dateB.getTime() - dateA.getTime();
    }

    return 0;
  };

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
}

export { CustomArticleList };
