import React from "react";

const ThumbnailMute = ({ muted, toggleMute }) => {
  const muteBtn = muted ? (
    <i className="fas fa-volume-mute button-symbol"></i>
  ) : (
    <i className="fas fa-volume-up button-symbol"></i>
  );

  return (
    <button className="preview-mute-btn right-side-btn" onClick={toggleMute}>
      {muteBtn}
      <i className="fas fa-circle preview-btn-bg"></i>
      <i className="far fa-circle preview-btn-outline"></i>
    </button>
  );
};

export default ThumbnailMute;
