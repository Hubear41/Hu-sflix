import React from "react";
import { withRouter } from "react-router-dom";
import ThumbnailPlayerDesc from "./thumbnail_player_desc";
import * as ThumbnailUtil from "../../util/thumbnail_util";

class ShowThumbnail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      muted: true,
      paused: true,
      focus: true,
      fontSize: 4
    };

    this.videoPlayer = React.createRef();
    this.wrapper = React.createRef();
    this.videoTimeout;
    this.launchWatch = this.launchWatch.bind(this);
    this.toggleMute = this.toggleMute.bind(this);
    this.playVideo = this.playVideo.bind(this);
    this.pauseVideo = this.pauseVideo.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleWindowResize = this.handleWindowResize.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;

    window.addEventListener("resize", this.handleWindowResize);
    this.setState({ fontSize: ThumbnailUtil.getFontSize(window.innerWidth) });
  }

  componentWillUnmount() {
    this._isMounted = false;

    clearTimeout(this.videoTimeout);
    clearTimeout(this.timeout);
    window.removeEventListener("resize", this.handleWindowResize);
  }

  handleWindowResize(e) {
    const windowSize = e.target.innerWidth;

    this.setState({ fontSize: ThumbnailUtil.getFontSize(windowSize) });
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
    e.stopPropagation();
    const videoEl = this.videoPlayer.current;

    if (videoEl.muted) {
      videoEl.muted = false;
      if (this._isMounted) this.setState({ muted: false });
    } else {
      videoEl.muted = true;
      if (this._isMounted) this.setState({ muted: true });
    }
  }

  handleMouseEnter(e) {
    this.playVideo();

    this._adjustRowAnimation();
  }

  handleMouseLeave(e) {
    const { rowRef } = this.props;

    this.pauseVideo();
    rowRef.current.style.removeProperty("transform");
  }

  _adjustRowAnimation() {
    const { rowRef, thumbnailNum } = this.props;

    const numOfTiles = ThumbnailUtil.getThumbnailCount(window.innerWidth);
    const growFactor = 1.8;

    const rightMostTile = () => {
      rowRef.current.style.transform = "translateX(0)";
    };

    const leftMostTile = () => {
      const padding = window.innerWidth >= 1400 ? 60 : 0.05 * window.innerWidth;

      const moveLeftDist =
        (-(window.innerWidth - padding * 2) / numOfTiles) * (growFactor - 1);

      rowRef.current.style.transform = `translateX(${moveLeftDist}px)`;
    };

    if (thumbnailNum % numOfTiles === 0) {
      return rightMostTile();
    } else if (thumbnailNum % numOfTiles === numOfTiles - 1) {
      return leftMostTile();
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
    videoEl.pause();
    this.props.endPreview();

    clearTimeout(this.videoTimeout);
    clearTimeout(this.timeout);
    if (this._isMounted) this.setState({ paused: true });
  }

  render() {
    const { show, preview, genres, listShowIds } = this.props;

    return (
      <>
        <li
          className="show-thumbnail"
          ref={this.wrapper}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        >
          <figure className="thumbnail-visual">
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

          <div
            className="thumbnail-player-desc thumbnail-grid"
            onClick={this.launchWatch}
            style={{ fontSize: `${this.state.fontSize}px` }}
          >
            <ThumbnailPlayerDesc
              muted={this.state.muted}
              toggleMute={this.toggleMute}
              listShowIds={listShowIds}
              currentUserId={this.props.currentUserId}
              show={show}
              genres={genres}
              addMyListVideo={this.props.addMyListVideo}
              removeMyListVideo={this.props.removeMyListVideo}
            />
          </div>
        </li>
      </>
    );
  }
}

export default withRouter(ShowThumbnail);
