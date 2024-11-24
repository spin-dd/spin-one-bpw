import { imageEntryToImage } from '../../utils/utils';

function CustomTemplateImage({
  data: pageData,
  // component props
  target = '',
}) {
  const node = target.split('.').reduce((object, key) => (object == null ? undefined : object[key]), pageData);
  if (node == null) {
    console.warn(`${target} is undefined`);
    return null;
  }
  return imageEntryToImage(node);
}

export { CustomTemplateImage };
