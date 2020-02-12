import React from "react";

const BannerPlay = ({ launchWatch }) => {
  return (
    <button className="banner-button" onClick={launchWatch}>
      <i className="fas fa-play"></i> Play
    </button>
  );
};

export default BannerPlay;
