import React from 'react';
import { imageEntryToImage } from '../../utils';

export const CustomTemplateImage: React.FC<{
  data: Record<string, unknown>;
  target?: string;
}> = ({
  data: pageData,
  // component props
  // 例：contentfulArticle.thumbnail
  target = '',
}) => {
  const node = target
    .split('.')
    .reduce<
      Record<string, unknown> | undefined
    >((object, key) => (object == null ? undefined : (object[key] as Record<string, unknown>)), pageData);
  if (node == null) {
    console.info(`${target} is undefined`);
    return null;
  }
  return imageEntryToImage(node);
};
