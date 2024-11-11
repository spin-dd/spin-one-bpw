"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.onRenderBody = void 0;
const react_1 = __importDefault(require("react"));
/**
 * react-helmet-async 内の script は非同期で読み込まれるため、
 * react-helmet-async 経由で jQuery を読み込むとタイミング次第では
 * jQuery が定義されておらず、エラーとなる
 * これに対応するため jQuery 関連は SSR で定義し、読み込ませる
 */
const HeadComponents = [
    react_1.default.createElement("script", { key: "ssr-jquery", src: "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js" }),
    react_1.default.createElement("script", { key: "ssr-jquery_inview", src: "/js/jquery.inview.min.js" }),
    react_1.default.createElement("script", { key: "ssr-jquery_scrollify", src: "https://cdnjs.cloudflare.com/ajax/libs/scrollify/1.0.21/jquery.scrollify.min.js", integrity: "sha512-UyX8JsMsNRW1cYl8BoxpcamonpwU2y7mSTsN0Z52plp7oKo1u92Xqfpv6lOlTyH3yiMXK+gU1jw0DVCsPTfKew==", crossOrigin: "anonymous" }),
];
const onRenderBody = ({ setHeadComponents }) => {
    setHeadComponents(HeadComponents);
};
exports.onRenderBody = onRenderBody;
