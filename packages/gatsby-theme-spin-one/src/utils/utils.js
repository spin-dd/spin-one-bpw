import React from 'react';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import { getSrc, getImage } from 'gatsby-plugin-image';
import escapeHtml from 'escape-html';
import { parseJson } from './common.mjs';

export const renderText = (text = '') =>
  text.split('\n').reduce((children, textSegment, index) => {
    return [...children, index > 0 && <br key={index} />, textSegment];
  }, []);

export const textInline = ({ data, target = '', escape = false }) => {
  const text = target.split('.').reduce((object, key) => (object == null ? undefined : object[key]), data);
  if (text == null) {
    console.warn(`${target} is undefined`);
    return '';
  }
  return escape ? escapeHtml(text) : text;
};

// text を html に整形（主に改行コードを br タグに変換）
export const htmlInline = (data, target = '') => {
  const text = target.split('.').reduce((object, key) => (object == null ? undefined : object[key]), data);
  if (text == null) {
    console.warn(`${target} is undefined`);
    return '';
  }
  return text.split('\n').join('<br />');
};

// entry 情報を取得するためのユーティリティ
export const customModuleNameFromNode = (node) => node?.attribs?.['data-custom-module-name'];
export const entryIdFromNode = (node) => node?.attribs?.['data-entry-contentful_id'];

// contentful_id から entry を取得する関数
export const entryWithId = (id, data) =>
  [...data.allContentfulComponent.nodes, ...data.allContentfulImage.nodes, ...data.allContentfulElement.nodes].filter(
    (entry) => entry.contentful_id === id,
  )[0];

// rich text を html に整形
const richTextToHtml = (richTextNodes = [], data) =>
  richTextNodes
    .map((node) => {
      switch (node.nodeType) {
        case BLOCKS.PARAGRAPH:
          return node.content
            .map((n) => {
              if (n.nodeType === INLINES.EMBEDDED_ENTRY) {
                return richTextToHtml([n], data);
              }
              return n.value;
            })
            .join('');
        case BLOCKS.EMBEDDED_ENTRY: {
          // embedded entry をカスタムモジュールに変換するための事前処理
          const blockEntry = entryWithId(node.data.target.sys.id, data);
          if (blockEntry === undefined) {
            throw new Error(`${node.data.target.sys.id} not found`);
          }
          const blockBody = parseJson(blockEntry.body?.raw);
          return blockEntry.moduleName
            ? `<custom-tag data-custom-module-name="${blockEntry.moduleName}" data-entry-contentful_id="${
                blockEntry.contentful_id
              }">${richTextToHtml(blockBody?.content, data)}</custom-tag>`
            : // Element の場合は、そのまま出力
              richTextToHtml(blockBody?.content, data);
        }
        // CustomTemplateText モジュールにのみ対応
        case INLINES.EMBEDDED_ENTRY: {
          const inlineEntry = entryWithId(node.data.target.sys.id, data);
          if (inlineEntry === undefined) {
            throw new Error(`${node.data.target.sys.id} not found`);
          }
          if (inlineEntry.moduleName !== 'CustomTemplateText') {
            throw new Error(`module ${inlineEntry.moduleName} is not supported on inline embedded entry`);
          }
          const { target, withBr } = parseJson(inlineEntry.props?.internal?.content) ?? {};
          if (withBr) {
            return htmlInline(data, target);
          } else {
            return textInline({
              data,
              target,
              escape: true,
            });
          }
        }
        default:
          console.error('unexpected nodeType', { node });
          return node;
      }
    })
    .join('\n');

export const imageEntryToImage = (entry) => {
  if (entry?.body == null) {
    return null;
  }
  const props = parseJson(entry.props?.internal?.content) ?? {};
  const src = new URL(getSrc(entry.body));
  const image = getImage(entry.body);
  src.searchParams.set('w', props.width ?? image.width.toFixed(0));
  src.searchParams.set('h', props.height ?? image.height.toFixed(0));
  return (
    <img
      key={entry.contentful_id}
      src={src.toString()}
      alt={entry.name}
      width={image.width.toFixed(0)}
      height={image.height.toFixed(0)}
      {...props}
    />
  );
};

export const parseCustomModuleName = (customModuleName = '') => {
  const [moduleName, ...subModuleNames] = customModuleName.split('.');
  return { moduleName, subModuleName: subModuleNames[0] };
};

// data.context 未完成の状態で呼び出すと body を html に変換する際に customTemplateText
// で参照できず警告がでるため事前に page.context を data.context にマージしておくこと
export const prepareForParse = ({ template = null, data, pageContext }) => {
  if (template === null) {
    throw new Error('Template is not found.');
  }

  const { context: injects, ...pageData } = data;
  // Contentful raw data to json
  const body = parseJson(template.body?.raw) ?? {};
  const head = parseJson(template.head?.raw) ?? {};
  const script = parseJson(template.script?.raw) ?? {};
  // json
  const context = parseJson(template.context?.internal?.content) ?? {};
  // RichText (json) to html
  const componentData = {
    ...pageData,
    // コンポーネントの context に由来
    context: {
      ...context,
      // data.context で上書きする
      ...injects,
    },
    // ページあるいはテンプレートの context に由来
    pageContext,
  };
  const htmlBody = richTextToHtml(body.content, componentData);
  const htmlHead = richTextToHtml(head.content, componentData);
  const htmlScript = richTextToHtml(script.content, componentData);

  return {
    htmlBody,
    htmlHead,
    htmlScript,
    componentData,
  };
};

export const parseSearchParams = (search) => {
  const searchParams = new URLSearchParams(search);
  return Array.from(searchParams.keys()).reduce((acc, key) => {
    acc[key] = searchParams.get(key);
    return acc;
  }, {});
};

export const mailFormData = ({ formId, subject, templateBody: body, data, confirmedData }) => {
  const formData = new FormData();
  const { htmlBody: mailBody } = prepareForParse({
    template: { body },
    data: {
      ...data,
      context: confirmedData,
    },
  });
  const name = confirmedData.nameKanji || `${confirmedData.nameKanjiSei} ${confirmedData.nameKanjiMei}`;
  formData.append('csrfToken', confirmedData.csrftoken);
  formData.append('g-recaptcha-response', confirmedData['g-recaptcha-response']);
  formData.append('formId', formId);
  formData.append('subject', `${subject} | ${name} 様`);
  formData.append('body', mailBody);
  formData.append('email', confirmedData.email);

  return formData;
};
