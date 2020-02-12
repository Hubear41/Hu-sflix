import React from "react";
import { withRouter } from "react-router-dom";
import MuteReplayBtn from "../buttons/banner_mute_replay";
import PlayButton from "../buttons/banner_play";
import MyListButton from "../buttons/banner_mylist";

class BannerVideo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      started: false,
      muted: true,
      imageOpacity: 1,
      ended: false
    };
    this.videoPlayer = React.createRef();
    this.poster = React.createRef();
    this.entirePreview = React.createRef();

    this.videoReady = this.videoReady.bind(this);
    this.videoEnded = this.videoEnded.bind(this);
    this.revealVideo = this.revealVideo.bind(this);
    this.playVideo = this.playVideo.bind(this);
    this.pauseVideo = this.pauseVideo.bind(this);
    this.launchWatch = this.launchWatch.bind(this);
    this.toggleMute = this.toggleMute.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    const { previewId } = this.props;

    this.props.requestVideo(previewId);

    window.addEventListener("scroll", this.handleScroll);
  }

  componentDidUpdate() {
    const { isPreviewing } = this.props;
    const { ended } = this.state;

    if (isPreviewing && !ended) {
      this.pauseVideo();
    } else if (!isPreviewing && !ended) {
      this.playVideo();
    }
  }

  componentWillUnmount() {
    this._isMounted = false;

    clearTimeout(this.timeout);
  }

  handleScroll() {
    const { isPreviewing } = this.props;
    const { ended } = this.state;
    let bigPreview = this.entirePreview.current;

    if (isPreviewing) {
      clearTimeout(this.timeout);
      this.pauseVideo();
    } else if (bigPreview !== null) {
      const scrollHeight =
        document.documentElement.scrollTop || document.body.scrollTop;

      // if the banner video can still play and the user has scrolled past 1/4 of it's height
      // it will pause the video after a second
      // or it will restart it once it's above 1/4
      if (!ended && scrollHeight > bigPreview.scrollHeight / 4) {
        this.timeout = setTimeout(() => {
          this.pauseVideo();
        }, 1500);
      } else if (!ended && scrollHeight <= bigPreview.scrollHeight / 4) {
        clearTimeout(this.timeout);

        if (this.videoPlayer.current.paused) {
          this.playVideo();
        }
      }
    }
  }

  toggleMute() {
    const videoEl = this.videoPlayer.current;

    if (videoEl.muted) {
      videoEl.muted = false;
      if (this._isMounted) this.setState({ muted: false });
    } else {
      videoEl.muted = true;
      if (this._isMounted) this.setState({ muted: true });
    }
  }

  videoReady() {
    // this.props.stopLoading();
    this.timeout = setTimeout(() => this.revealVideo(), 2000);
  }

  revealVideo() {
    const videoEl = this.videoPlayer.current;

    videoEl.play();
    if (this._isMounted)
      this.setState({ imageOpacity: 0, ended: false, started: true });
  }

  playVideo() {
    const videoEl = this.videoPlayer.current;
    let bigPreview = this.entirePreview.current;

    if (window.pageYOffset < bigPreview.scrollHeight / 3 && videoEl.paused) {
      this.timeout = setTimeout(() => {
        videoEl.play().then(() => {
          if (this._isMounted) this.setState({ imageOpacity: 0 });
        });
      }, 1000);
    }
  }

  pauseVideo() {
    const videoEl = this.videoPlayer.current;

    if (!videoEl.paused) {
      this.timeout = setTimeout(() => {
        videoEl.pause();
        if (this._isMounted) this.setState({ imageOpacity: 1 });
      }, 1000);
    }
  }

  videoFunction() {
    const { ended } = this.state;

    if (ended) {
      return this.revealVideo;
    } else {
      return this.toggleMute;
    }
  }

  videoEnded() {
    if (this._isMounted) this.setState({ imageOpacity: 1, ended: true });
  }

  launchWatch() {
    const { show } = this.props;

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

  render() {
    const { show, video, mylistIds, currentUserId } = this.props;
    const { imageOpacity, started, ended, muted } = this.state;

    const buttonFunc = this.videoPlayer.current ? this.videoFunction() : null;

    let imageAnimation = "";
    let blackAnimation = "";
    if (started && imageOpacity === 0) {
      imageAnimation = "fade-out";
      blackAnimation = "fade-out-black";
    } else if (started && imageOpacity === 1) {
      imageAnimation = "fade-in";
      blackAnimation = "fade-in-black";
    } else if (ended) {
      imageAnimation = "fade-in";
      blackAnimation = "fade-in-black";
    }

    return (
      <div className="banner-video-container" ref={this.entirePreview}>
        <figure className="banner-presentation-container">
          <img
            src={show && show.posterUrl ? show.posterUrl : window.tempBgURL}
            className={`banner-poster ${imageAnimation}`}
            ref={this.poster}
          ></img>

          <video
            controls={true}
            muted
            className="banner-video"
            ref={this.videoPlayer}
            onCanPlayThrough={this.videoReady}
            onEnded={this.videoEnded}
          >
            {video && video.videoUrl ? (
              <source src={video.videoUrl} type="video/mp4" />
            ) : null}
          </video>
        </figure>

        <article className="banner-description-container">
          <article className="banner-show-title">
            <h3>
              <strong>Hu'sflix</strong> Original
            </h3>
            <article className="title-container">
              <h1>{show.title}</h1>
            </article>
          </article>

          <div className="big-preview-play-mylist-btns">
            <PlayButton launchWatch={this.launchWatch} />

            <MyListButton
              showId={show.id}
              currentUserId={currentUserId}
              mylistIds={mylistIds}
              removeMyListVideo={this.props.removeMyListVideo}
              addMyListVideo={this.props.addMyListVideo}
            />
          </div>

          <p className={`banner-tagline ${imageAnimation}`}>{show.tagline}</p>
        </article>

        <figure className="banner-right-button">
          <span className="maturity-rating">
            <span>{show.maturity_rating}</span>
          </span>
          <MuteReplayBtn
            buttonFunc={buttonFunc}
            started={started}
            ended={ended}
            muted={muted}
            paused={
              this.videoPlayer.current ? this.videoPlayer.current.paused : true
            }
          />
        </figure>
      </div>
    );
  }
}

export default withRouter(BannerVideo);
