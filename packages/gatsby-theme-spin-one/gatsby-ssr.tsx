import React from 'react';
import type { GatsbySSR } from 'gatsby';

/**
 * react-helmet-async 内の script は非同期で読み込まれるため、
 * react-helmet-async 経由で jQuery を読み込むとタイミング次第では
 * jQuery が定義されておらず、エラーとなる
 * これに対応するため jQuery 関連は SSR で定義し、読み込ませる
 */
const HeadComponents = [
  <script key="ssr-jquery" src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js" />,
  <script key="ssr-jquery_inview" src="/js/jquery.inview.min.js" />,
  <script
    key="ssr-jquery_scrollify"
    src="https://cdnjs.cloudflare.com/ajax/libs/scrollify/1.0.21/jquery.scrollify.min.js"
    integrity="sha512-UyX8JsMsNRW1cYl8BoxpcamonpwU2y7mSTsN0Z52plp7oKo1u92Xqfpv6lOlTyH3yiMXK+gU1jw0DVCsPTfKew=="
    crossOrigin="anonymous"
  ></script>,
];

export const onRenderBody: GatsbySSR['onRenderBody'] = ({ setHeadComponents }) => {
  setHeadComponents(HeadComponents);
};
