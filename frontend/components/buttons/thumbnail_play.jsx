import React from "react";

const ThumbnailPlay = ({ color }) => {
  return (
    <button className={`thumbnail-play-icon ${color}`}>
      <i className="fas fa-play play-btn-triangle"></i>
      <i className="fas fa-circle play-btn-bg"></i>
      <i className="far fa-circle play-btn-outline"></i>
    </button>
  );
};

export default ThumbnailPlay;
