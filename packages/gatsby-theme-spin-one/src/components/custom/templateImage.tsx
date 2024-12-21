import { imageEntryToImage } from '../../utils/utils';

export const CustomTemplateImage = ({
  data: pageData,
  // component props
  // 例：contentfulArticle.thumbnail
  target = '',
}) => {
  const node = target.split('.').reduce((object, key) => (object == null ? undefined : object[key]), pageData);
  if (node == null) {
    console.warn(`${target} is undefined`);
    return null;
  }
  return imageEntryToImage(node);
};
