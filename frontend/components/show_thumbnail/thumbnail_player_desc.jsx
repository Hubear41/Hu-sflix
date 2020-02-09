import React from "react";
import * as DateTimeUTIL from "../../util/date_time_util";
import MyListButton from "./mylist_button";

const ThumbnailPlayerDesc = props => {
  const {
    show,
    genres,
    currentUserId,
    listShowIds,
    muted,
    toggleMute,
    addMyListVideo,
    removeMyListVideo
  } = props;

  const muteBtn = muted ? (
    <i className="fas fa-volume-mute button-symbol"></i>
  ) : (
    <i className="fas fa-volume-up button-symbol"></i>
  );

  // find and format the genre names to be displayed
  const genresToShow = [];
  if (show !== undefined && genres.length >= 1) {
    genres.forEach((genre, idx) => {
      if (genre === undefined) {
        return;
      }

      // ignore of the genre tags TV Show, Movie, Recently Added or
      // if there are more than 3 genres already
      if (
        genre.name !== "TV Show" &&
        genre.name !== "Movie" &&
        genre.name !== "Recently Added" &&
        genresToShow.length < 3
      ) {
        // append a "*" after each genre if they aren't the last one
        if (genresToShow.length === 2) {
          genresToShow.push(
            <span className="genre-title" key={genre.name + genre.id}>
              {genre.name}
            </span>
          );
        } else {
          genresToShow.push(
            <span className="genre-title" key={genre.name + genre.id}>
              {genre.name}
            </span>
          );
          genresToShow.push(
            <strong className="genre-bullet" key={"bullet " + idx}>
              {" "}
              {"\u2022"}{" "}
            </strong>
          );
        }
      }
    });
  }

  return (
    <>
      <aside className="thumbnail-right-nav thumbnail-side">
        <button
          className="preview-mute-btn right-side-btn"
          onClick={toggleMute}
        >
          {muteBtn}
          <i className="fas fa-circle preview-btn-bg"></i>
          <i className="far fa-circle preview-btn-outline"></i>
        </button>
        <div className="right-side-placeholders right-side-btn"></div>
        <div className="right-side-placeholders right-side-btn"></div>

        <MyListButton
          listShowIds={listShowIds}
          currentUserId={currentUserId}
          showId={show.id}
          addMyListVideo={addMyListVideo}
          removeMyListVideo={removeMyListVideo}
        />
      </aside>

      <button className="thumbnail-play-icon thumbnail-play">
        <i className="fas fa-play play-btn-triangle"></i>
        <i className="fas fa-circle play-btn-bg"></i>
        <i className="far fa-circle play-btn-outline"></i>
      </button>

      <figcaption className="thumbnail-desc preview-info">
        <h5 className="preview-title">{show.title}</h5>

        <article className="preview-details">
          <h6 className="preview-maturity-rating">
            <span>{show.maturity_rating}</span>
          </h6>
          <span className="preview-runtime">
            {DateTimeUTIL.secondsToHoursMinutes(show.runtime)}
          </span>
        </article>

        <article className="preview-genres">{genresToShow}</article>
      </figcaption>

      <button className="toggle-dropdown thumbnail-footer">
        <i className="fas fa-chevron-down"></i>
      </button>
    </>
  );
};

export default ThumbnailPlayerDesc;
