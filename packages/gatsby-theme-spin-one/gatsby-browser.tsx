import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import type { GatsbyBrowser } from 'gatsby';

export const wrapRootElement: GatsbyBrowser['wrapRootElement'] = ({ element }) => (
  <React.StrictMode>{element}</React.StrictMode>
);

// gatsby-react-router-scroll の機能を無効化する
export const shouldUpdateScroll: GatsbyBrowser['shouldUpdateScroll'] = () => false;
