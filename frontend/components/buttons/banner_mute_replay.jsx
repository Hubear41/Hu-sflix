import React from "react";

const BannerMuteReplay = ({ buttonFunc, paused, started, muted, ended }) => {
  const getButtonIcon = () => {
    if (!started) {
      return null;
    }

    if (ended) {
      return <i className="fas fa-redo"></i>;
    } else if (!muted) {
      return <i className="fas fa-volume-up"></i>;
    } else {
      return <i className="fas fa-volume-mute"></i>;
    }
  };

  const iconStyle =
    (started && !paused) || ended ? { opacity: 1 } : { opacity: 0 };
  const buttonIcon = getButtonIcon();

  return (
    <button
      className="banner-replay-mute-btn"
      style={iconStyle}
      onClick={buttonFunc}
    >
      <div className="preview-icon">
        <div className="preview-current-icon">{buttonIcon}</div>
        <i className="fas fa-circle preview-circle"></i>
        <i className="far fa-circle preview-outline"></i>
      </div>
    </button>
  );
};

export default BannerMuteReplay;
