import { imageEntryToImage } from '../../utils/utils';

export const CustomTemplateImage = ({
  data: pageData,
  // component props
  // 例：contentfulArticle.thumbnail
  target = '',
}) => {
  const node = target.split('.').reduce((object, key) => (object == null ? undefined : object[key]), pageData);
  if (node == null) {
    // TODO: Content modelの定義済みオプショナルフィールドが空の場合も該当するためgatsby-node.tsで型定義する
    console.info(`${target} is undefined`);
    return null;
  }
  return imageEntryToImage(node);
};
