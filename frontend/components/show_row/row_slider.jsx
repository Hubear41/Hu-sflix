import React from "react";
import SliderControls from "./slider_controls";
import PageIndicators from "./page_indicators";

const RowSlider = ({ currentPage, pageCount, leftClick, rightClick }) => {
  return (
    <>
      <PageIndicators currentPage={currentPage} pageCount={pageCount} />
      <SliderControls
        currentPage={currentPage}
        pageCount={pageCount}
        leftClick={leftClick}
        rightClick={rightClick}
      />
    </>
  );
};

export default RowSlider;
