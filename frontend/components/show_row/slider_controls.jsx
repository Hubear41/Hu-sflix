import React from "react";

const SliderControls = ({ currentPage, pageCount, leftClick, rightClick }) => {
  if (pageCount <= 1) {
    return null;
  }

  const leftControl = (
    <button className="slider-control left" onClick={leftClick}>
      <i className="fas fa-chevron-left"></i>
    </button>
  );
  const rightControl = (
    <button className="slider-control right" onClick={rightClick}>
      <i className="fas fa-chevron-right"></i>
    </button>
  );

  if (currentPage === 1) {
    return <>{rightControl}</>;
  } else if (currentPage === pageCount) {
    return <>{leftControl}</>;
  } else {
    return (
      <>
        {leftControl}
        {rightControl}
      </>
    );
  }
};

export default SliderControls;
