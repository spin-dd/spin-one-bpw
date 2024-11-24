import React from 'react';

function CustomTemplateHtml({
  data: pageData,
  // component props
  // 例：contentfulInformation.body.childMarkdownRemark.html
  target = '',
}) {
  const html = target.split('.').reduce((object, key) => (object == null ? undefined : object[key]), pageData);
  if (html == null) {
    console.warn(`${target} is undefined`);
    return null;
  }

  return <custom-tag dangerouslySetInnerHTML={{ __html: html }} />;
}

export { CustomTemplateHtml };
