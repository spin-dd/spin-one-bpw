import React from 'react';

export const CustomTemplateHtml: React.FC<{
  data: Record<string, unknown>;
  target?: string;
}> = ({
  data: pageData,
  // component props
  // 例：contentfulArticle.body.childMarkdownRemark.html
  target = '',
}) => {
  const html = target
    .split('.')
    .reduce<
      Record<string, unknown> | undefined
    >((object, key) => (object == null ? undefined : (object[key] as Record<string, unknown>)), pageData);
  if (html == null) {
    console.warn(`${target} is undefined`);
    return null;
  }

  return <custom-tag dangerouslySetInnerHTML={{ __html: html }} />;
};
