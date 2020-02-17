import React from "react";
import { times } from "lodash";

const PageIndicator = ({ currentPage, pageCount }) => {
  if (pageCount <= 1) {
    return null;
  }

  const pageIndicators = [];
  times(pageCount, idx => {
    if (idx + 1 === currentPage) {
      pageIndicators.push(
        <li key={idx + 1} className="page-indicator selected"></li>
      );
    } else {
      pageIndicators.push(<li key={idx + 1} className="page-indicator"></li>);
    }
  });

  return <ul className="page-indicator-list">{pageIndicators}</ul>;
};
export default PageIndicator;
