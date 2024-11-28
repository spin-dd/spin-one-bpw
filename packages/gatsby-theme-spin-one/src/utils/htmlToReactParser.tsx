import React from 'react';
import { ProcessNodeDefinitions, Parser } from 'html-to-react';

import { customModuleNameFromNode, entryIdFromNode, entryWithId, imageEntryToImage } from './utils';
import { parseJson } from './common';

// カスタムコンポーネント
import * as customComponents from '../components/CustomComponents';

// node には rich text をプレ処理した text をパースしたものが格納されている
const processingInstructions = (data) => [
  // Image
  // props で width や height の指定があれば Contentful でリサイズし、通常の img タグとして表示
  {
    shouldProcessNode: (node) => customModuleNameFromNode(node) === 'Image',
    processNode: (node) => {
      const entryId = entryIdFromNode(node);
      const entry = entryWithId(entryId, data);
      const body = entry.body;
      if (body === null) {
        // 多言語対応：対応言語の body がない場合
        return null;
      }
      return imageEntryToImage(entry);
    },
  },
  // カスタムコンポーネント
  {
    shouldProcessNode: (node) => {
      const moduleName = customModuleNameFromNode(node);
      return moduleName && moduleName in customComponents;
    },
    processNode: (node, children) => {
      const moduleName = customModuleNameFromNode(node);
      const CustomComponent = customComponents[moduleName];
      const entryId = entryIdFromNode(node);
      const entry = entryWithId(entryId, data);
      const props = parseJson(entry.props?.internal?.content) ?? {};
      return (
        <CustomComponent key={entry.contentful_id} data={data} entry={entry} {...props}>
          {children}
        </CustomComponent>
      );
    },
  },
  // Contentful Content Type: Element
  {
    shouldProcessNode: (node) => customModuleNameFromNode(node) === '',
    processNode: (_, children) => children,
  },
  // デフォルト処理
  {
    shouldProcessNode: () => true,
    processNode: ProcessNodeDefinitions().processDefaultNode,
  },
];

const isValidNode = () => true;

export const parseHtmlToReact = (html, data) => {
  // https://github.com/aknuds1/html-to-react
  const htmlToReactParser = Parser();
  const instructions = processingInstructions(data);
  return htmlToReactParser.parseWithInstructions(html, isValidNode, instructions);
};
