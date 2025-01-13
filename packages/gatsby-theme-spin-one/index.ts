import './gatsby-types';
import type { PageProps } from 'gatsby';

/**
 * parseHtmlToReact で処理可能な Contentful Entry の型
 */
export type ParsableContentfulEntry = Queries.ContentfulTemplate | Queries.ContentfulPage | Queries.ContentfulComponent;

export type ComponentProps<T = object, K = object> = Pick<
  PageProps<T & Queries.AllContentfulEntryFragmentFragment, K>,
  'data' | 'pageContext'
>;
