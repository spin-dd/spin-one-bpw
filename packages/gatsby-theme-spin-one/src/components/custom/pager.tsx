import React from 'react';
import { Link } from 'gatsby';

interface PagerProps {
  tagName?: string;
  className?: string;
  data: {
    basePath: string;
    pageInfo: {
      currentPage: number;
      pageCount: number;
      hasPreviousPage: boolean;
      hasNextPage: boolean;
    };
  };
}

export const CustomPager: React.FC<PagerProps> = ({ tagName, className, data: { basePath, pageInfo } }) => {
  const { currentPage, pageCount, hasPreviousPage, hasNextPage } = pageInfo;

  if (pageCount <= 1) return null;

  const prevPath = hasPreviousPage ? (currentPage === 2 ? basePath : `${basePath}${currentPage - 1}/`) : null;
  const nextPath = hasNextPage ? `${basePath}${currentPage + 1}` : null;

  return React.createElement(
    tagName,
    { className },
    <ul className="pagination">
      {prevPath && (
        <li className="page-item">
          <Link to={prevPath} className="page-link" rel="prev">
            Previous
          </Link>
        </li>
      )}
      {Array.from({ length: pageCount }, (_, i) => (
        <li key={`page-${i + 1}`} className="page-item">
          <Link className="page-link" activeClassName="active" to={i === 0 ? basePath : `${basePath}${i + 1}`}>
            {i + 1}
          </Link>
        </li>
      ))}
      {nextPath && (
        <li className="page-item">
          <Link to={nextPath} className="page-link" rel="next">
            Next
          </Link>
        </li>
      )}
    </ul>,
  );
};
