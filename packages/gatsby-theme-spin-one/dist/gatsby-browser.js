import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
export const wrapRootElement = ({ element }) => (React.createElement(React.StrictMode, null, element));
// gatsby-react-router-scroll の機能を無効化する
export const shouldUpdateScroll = () => false;
