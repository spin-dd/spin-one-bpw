"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.shouldUpdateScroll = exports.wrapRootElement = void 0;
require("bootstrap/dist/css/bootstrap.min.css");
const react_1 = __importDefault(require("react"));
const wrapRootElement = ({ element }) => (react_1.default.createElement(react_1.default.StrictMode, null, element));
exports.wrapRootElement = wrapRootElement;
// gatsby-react-router-scroll の機能を無効化する
const shouldUpdateScroll = () => false;
exports.shouldUpdateScroll = shouldUpdateScroll;
