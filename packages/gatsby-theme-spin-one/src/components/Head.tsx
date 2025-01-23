import React from 'react';
import { prepareForParse, parseHtmlToReact } from '../utils';
import type { HeadProps } from 'gatsby';
import type { ParsableContentfulEntry } from '../..';

export const Head: React.FC<
  HeadProps<{ template: ParsableContentfulEntry } & Queries.AllContentfulEntryFragmentFragment>
> = ({ data, pageContext }) => {
  const { template } = data;
  // 指定したテンプレートが存在しない場合
  if (!template) {
    return null;
  }

  const { htmlHead, componentData } = prepareForParse({
    template,
    data,
    pageContext,
  });

  return <>{parseHtmlToReact(htmlHead, componentData)}</>;
};
