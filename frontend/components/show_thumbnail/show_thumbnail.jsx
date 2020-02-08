import React from "react";
import { withRouter } from "react-router-dom";
import * as DateTimeUTIL from "../../util/date_time_util";
import MyListButton from "./mylist_button";

class ShowThumbnail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 0,
      muted: true,
      paused: true,
      focus: true
    };

    this.videoPlayer = React.createRef();
    this.wrapper = React.createRef();
    this.videoTimeout;
    this.launchWatch = this.launchWatch.bind(this);
    this.toggleMute = this.toggleMute.bind(this);
    this.playVideo = this.playVideo.bind(this);
    this.pauseVideo = this.pauseVideo.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;

    const height = 160;
    this.setState({ height });
  }

  componentWillUnmount() {
    this._isMounted = false;

    clearTimeout(this.videoTimeout);
    clearTimeout(this.timeout);
  }

  launchWatch() {
    const { show } = this.props;
    const videoEl = this.videoPlayer.current;

    videoEl.pause();
    clearTimeout(this.videoTimeout);

    if (show.type === "Movie") {
      this.props.history.push({
        pathname: `/watch/${show.id}`,
        search: `trackId=${show.film_id}`
      });
    } else {
      this.props.history.push({
        pathname: `/watch/${show.id}`,
        search: `trackId=${show.episode_ids[0]}`
      });
    }
  }

  toggleMute(e) {
    const videoEl = this.videoPlayer.current;

    if (videoEl.muted) {
      videoEl.muted = false;
      if (this._isMounted) this.setState({ muted: false });
    } else {
      videoEl.muted = true;
      if (this._isMounted) this.setState({ muted: true });
    }
  }

  playVideo() {
    if (this.videoPlayer.current === null || this.state.paused === false) {
      return;
    }

    const videoEl = this.videoPlayer.current;
    this.videoTimeout = setTimeout(() => {
      videoEl.play().then(() => {
        if (this._isMounted) {
          this.props.startPreview();
          this.setState({ paused: false });
        }
      });
    }, 800);

    this.timeout = setTimeout(() => {
      this.props.startPreview();
    }, 500);
  }

  pauseVideo() {
    if (this.videoPlayer.current === null || this.state.paused) {
      return;
    }

    const videoEl = this.videoPlayer.current;
    const wrapperEl = this.wrapper.current;
    // wrapperEl.classList.add("out");

    videoEl.pause();
    this.props.endPreview();

    clearTimeout(this.videoTimeout);
    clearTimeout(this.timeout);
    if (this._isMounted) this.setState({ paused: true });
  }

  render() {
    const { show, preview, genres, listShowIds } = this.props;
    const genresToShow = [];
    const muteBtn = this.state.muted ? (
      <i className="fas fa-volume-mute button-symbol"></i>
    ) : (
      <i className="fas fa-volume-up button-symbol"></i>
    );

    if (show !== undefined && genres.length >= 1) {
      genres.forEach((genre, idx) => {
        if (genre === undefined) {
          return;
        }

        if (
          genre.name !== "TV Show" &&
          genre.name !== "Movie" &&
          genre.name !== "Recently Added" &&
          genresToShow.length < 3
        ) {
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
        <li
          className="show-thumbnail"
          ref={this.wrapper}
          onMouseEnter={this.playVideo}
          onMouseLeave={this.pauseVideo}
        >
          <figure className="thumbnail-visual" onMouseLeave={this.pauseVideo}>
            <img
              className="thumbnail-poster"
              src={show ? show.posterUrl : window.tempBgURL}
              alt={show.title}
              onClick={this.launchWatch}
              onMouseEnter={this.playVideo}
            ></img>
            <video
              className="thumbnail-player"
              ref={this.videoPlayer}
              onClick={this.launchWatch}
              muted="muted"
            >
              <source src={preview ? preview.videoUrl : ""} type="video/mp4" />
            </video>
          </figure>

          <div className="thumbnail-player-desc thumbnail-grid">
            <aside className="thumbnail-right-nav thumbnail-side">
              <button
                className="preview-mute-btn right-side-btn"
                onClick={this.toggleMute}
              >
                {muteBtn}
                <i className="fas fa-circle preview-btn-bg"></i>
                <i className="far fa-circle preview-btn-outline"></i>
              </button>
              <div className="right-side-placeholders right-side-btn"></div>
              <div className="right-side-placeholders right-side-btn"></div>

              <MyListButton
                listShowIds={listShowIds}
                currentUserId={this.props.currentUserId}
                showId={show.id}
                addMyListVideo={this.props.addMyListVideo}
                removeMyListVideo={this.props.removeMyListVideo}
              />
            </aside>

            <button className="thumbnail-play-icon thumbnail-play">
              <i className="fas fa-play play-btn-triangle"></i>
              <i className="fas fa-circle play-btn-bg"></i>
              <i className="far fa-circle play-btn-outline"></i>
            </button>

            <figcaption
              className="thumbnail-desc preview-info"
              onClick={this.launchWatch}
            >
              <h5 className="preview-title">{show.title}</h5>

              <article className="preview-details">
                <h3 className="preview-maturity-rating">
                  <span>{show.maturity_rating}</span>
                </h3>
                <span className="preview-runtime">
                  {DateTimeUTIL.secondsToHoursMinutes(show.runtime)}
                </span>
              </article>

              <article className="preview-genres">{genresToShow}</article>
            </figcaption>

            {/* <button className="toggle-show-detail-btn">
              <i className="fas fa-chevron-down"></i>
            </button> */}
          </div>
        </li>
      </>
    );
  }
}

export default withRouter(ShowThumbnail);
