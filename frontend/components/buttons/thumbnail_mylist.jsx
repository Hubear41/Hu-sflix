import React, { useState, useEffect, useRef } from "react";

const REMOVING = "REMOVING";
const ADDING = "ADDING";
const IS_ON_LIST = "IS_ON_LIST";
const NOT_ON_LIST = "NOT_ON_LIST";

const MyListButton = ({
  listShowIds,
  showId,
  currentUserId,
  addMyListVideo,
  removeMyListVideo
}) => {
  const _isMounted = useRef(false);

  // state of the mylist button
  const [myListState, updateMyListState] = useState(
    listShowIds.includes(showId) ? IS_ON_LIST : NOT_ON_LIST
  );

  useEffect(() => {
    _isMounted.current = true;

    return () => {
      _isMounted.current = false;
    };
  }, []);

  // whenever listShowIds change, check if the current show is still on the list
  useEffect(() => {
    if (myListState === NOT_ON_LIST && listShowIds.includes(showId)) {
      updateMyListState(IS_ON_LIST);
    } else if (myListState === IS_ON_LIST && !listShowIds.includes(showId)) {
      updateMyListState(NOT_ON_LIST);
    }
  }, [listShowIds]);

  const toggleMyList = e => {
    e.stopPropagation();

    if (myListState === IS_ON_LIST) {
      if (_isMounted.current) {
        updateMyListState(REMOVING);

        removeMyListVideo(currentUserId, showId).then(() => {
          if (_isMounted.current) updateMyListState(NOT_ON_LIST);
        });
      }
    } else if (myListState === NOT_ON_LIST) {
      if (_isMounted.current) {
        updateMyListState(ADDING);

        addMyListVideo(currentUserId, showId).then(() => {
          if (_isMounted.current) updateMyListState(IS_ON_LIST);
        });
      }
    }
  };

  return (
    <button
      onClick={toggleMyList}
      className="preview-mylist-btn right-side-btn preview-fade-in"
    >
      {myListState === IS_ON_LIST ? (
        <i className="fas fa-check button-symbol"></i>
      ) : (
        <i className="fas fa-plus button-symbol"></i>
      )}

      <i className="fas fa-circle preview-btn-bg"></i>
      <i className="far fa-circle preview-btn-outline"></i>

      {/* <span className='mylist-popup-desc preview-fade-in'>{myListState}</span> */}
    </button>
  );
};

export default MyListButton;
