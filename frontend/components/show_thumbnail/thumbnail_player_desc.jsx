import React from "react";
import * as DateTimeUTIL from "../../util/date_time_util";
import MyListButton from "../buttons/thumbnail_mylist";
import PlayButton from "../buttons/thumbnail_play";
import MuteButton from "../buttons/thumbnail_mute";

const RED = "red";
const WHITE = "white";

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
        <MuteButton muted={muted} toggleMute={toggleMute} />

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

      <figcaption className="thumbnail-desc preview-info">
        <PlayButton color={RED} />

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
