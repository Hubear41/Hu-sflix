import React, { useState, useEffect, useRef } from "react";

const MY_LIST = "My List";
const REMOVING = "Removing...";
const ADDING = "Adding...";

const BannerMylist = ({
  showId,
  currentUserId,
  mylistIds,
  removeMyListVideo,
  addMyListVideo
}) => {
  const [buttonText, updateButtonText] = useState("My List");
  const _isMounted = useRef(false);

  useEffect(() => {
    _isMounted.current = true;

    return () => {
      _isMounted.current = false;
    };
  }, []);

  const toggleMyList = () => {
    // button clicks don't do anything while Adding or Removing
    if (buttonText === MY_LIST) {
      if (mylistIds.includes(showId)) {
        // display "Removing..." while making request
        if (_isMounted.current) updateButtonText(REMOVING);

        removeMyListVideo(currentUserId, showId).then(() => {
          // after removing the video, return button to display "My List"
          if (_isMounted.current) updateButtonText(MY_LIST);
        });
      } else {
        // display "Adding..." while making request
        if (_isMounted.current) updateButtonText(ADDING);

        addMyListVideo(currentUserId, showId).then(() => {
          // after adding the video, return button to display "My List"
          if (_isMounted.current) updateButtonText(MY_LIST);
        });
      }
    }
  };

  const myListIcon = mylistIds.includes(showId) ? (
    <i className="fas fa-check"></i>
  ) : (
    <i className="fas fa-plus"></i>
  );

  return (
    <button className="banner-button" onClick={toggleMyList}>
      {myListIcon} {buttonText}
    </button>
  );
};

export default BannerMylist;
