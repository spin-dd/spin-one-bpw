import { renderText, textInline } from '../../utils';

// Contentful のデータからテキストを取得する
export const CustomTemplateText = ({
  data: pageData,
  context: pageContext,
  // 例：contentfulArticle.title
  target = '',
  withBr = false,
}: {
  data: Record<string, unknown>;
  context: Record<string, unknown>;
  target?: string;
  withBr?: boolean;
}) => {
  const text = textInline({
    data: {
      ...pageData,
      pageContext,
    },
    target,
  });
  if (text == null) {
    return null;
  }

  return withBr ? renderText(text) : text;
};
