import React from "react";
import { Link, withRouter } from "react-router-dom";
import * as DateTimeUTIL from "../../util/date_time_util";

class Watch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPlayerTime: 0,
      paused: true,
      fullscreen: false,
      muted: false,
      volume: 0.8,
      prevVolume: 0.8,
      hidden: true,
      mouseMoving: null,
      loaded: false,
      away: null,
      started: false,
      currentKey: null
    };
    this.timeout;
    this.awayTimer;
    this.videoPlayer = React.createRef();
    this.fullControlArea = React.createRef();

    this.openFullscreen = this.openFullscreen.bind(this);
    this.closeFullscreen = this.closeFullscreen.bind(this);
    this.videoReady = this.videoReady.bind(this);
    this.togglePlayPause = this.togglePlayPause.bind(this);
    this.toggleMute = this.toggleMute.bind(this);
    this.jumpBack = this.jumpBack.bind(this);
    this.jumpForward = this.jumpForward.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleVolumeChange = this.handleVolumeChange.bind(this);
    this.changeVolume = this.changeVolume.bind(this);
    this.showControls = this.showControls.bind(this);
    this._hideControls = this._hideControls.bind(this);
    this._tick = this._tick.bind(this);
    this._hideAway = this._hideAway.bind(this);
    this.backToBrowse = this.backToBrowse.bind(this);
    this.determineKeyPress = this.determineKeyPress.bind(this);
    this.removeFromMyList = this.removeFromMyList.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;

    const { showId } = this.props.match.params;
    this.props.fetchShow(showId);

    this.interval = setInterval(this._tick, 1000); //updates the timer each half second
    document.addEventListener("keydown", e => this.determineKeyPress(e));
  }

  componentWillUnmount() {
    this._isMounted = false;

    document.removeEventListener("keydown", e => this.determineKeyPress(e));
    clearInterval(this.interval);
  }

  determineKeyPress(e) {
    if (this._isMounted) {
      switch (e.keyCode) {
        case 13: // enter
          this.togglePlayPause();
          this.setState({ currentKey: "play/pause" });
          break;
        case 32: // spacebar
          e.preventDefault();
          this.togglePlayPause();
          this.setState({ currentKey: "play/pause" });
          break;
        case 27: // escape
          document.fullscreen ? this.closeFullscreen() : null;
          break;
        case 38: // up arrow
          this.changeVolume(0.1);
          this.setState({ currentKey: "volumeUp" });
          break;
        case 40: // down arrow
          this.changeVolume(-0.1);
          this.setState({ currentKey: "volumeDown" });
          break;
        case 39: // right arrow
          this.jumpForward();
          this.setState({ currentKey: "jumpForward" });
          break;
        case 37: // left arrow
          this.jumpBack();
          this.setState({ currentKey: "jumpBack" });
          break;
        case 77: // m key
          this.toggleMute();
          this.setState({ currentKey: "mute/unmute" });
          break;
        case 70: // f key
          if (document.fullscreen) {
            this.closeFullscreen();
          } else {
            this.openFullscreen();
          }
          break;
        default:
          break;
      }
    }
  }

  videoReady() {
    const videoEl = this.videoPlayer.current;
    const { started } = this.state;

    if (started === false) {
      videoEl.volume = 0.8;
      videoEl.muted = false;
      this.togglePlayPause();
    }
  }

  togglePlayPause() {
    const videoEl = this.videoPlayer.current;
    const { paused, started, away } = this.state;

    // play() returns a promise obj
    // the state is only changed if play works
    // prevents the play button from changing until it can play
    if (paused && videoEl) {
      clearTimeout(this.awayTimer);

      videoEl.play().then(() => {
        this.setState({
          paused: false,
          started: true,
          away: away === null ? null : false
        });
      });
    } else if (!paused && videoEl) {
      videoEl.pause();
      this.setState({ paused: true });

      this.awayTimer = setTimeout(() => {
        if (this._isMounted && started === true) this.setState({ away: true });
      }, 3000);
    }
  }

  toggleMute() {
    const { muted, volume, prevVolume } = this.state;
    const videoEl = this.videoPlayer.current;
    const currVolume = volume === 0 ? 0.1 : volume;

    // if audio has been muted, this resets the audio level back to it's
    // previous amount.
    // otherwise, this saves the current volume and set volume to 0
    // volume is set to 0 incase the user tries to change the volume manually
    if (muted) {
      videoEl.muted = false;
      videoEl.volume = prevVolume;
      this.setState({ muted: false, volume: prevVolume });
    } else {
      videoEl.muted = true;
      videoEl.volume = 0;
      this.setState({ muted: true, volume: 0, prevVolume: currVolume });
    }
  }

  // only used for the up and down arrow keys
  changeVolume(amount) {
    const videoEl = this.videoPlayer.current;
    let newVolume = videoEl.volume + amount;

    if (newVolume > 1) {
      newVolume = 1;
    } else if (newVolume < 0) {
      newVolume = 0;
    }

    videoEl.volume = newVolume;
    this.setState({ volume: newVolume });
  }

  // this method is used whenever the user grabs the thumb of the audio input.
  // as well as changing volume, this method also makes sure to adjust the mute
  // variable as well.
  handleVolumeChange(e) {
    this.showControls(); // keeps controls visible during drag event

    const videoEl = this.videoPlayer.current;
    videoEl.volume = e.target.value;

    if (videoEl.volume === 0) {
      videoEl.muted = true;
      this.setState({ volume: videoEl.volume, muted: true, prevVolume: 0.1 });
    } else if (videoEl.muted) {
      videoEl.muted = false;
      this.setState({ volume: videoEl.volume, muted: false });
    } else {
      this.setState({ volume: videoEl.volume });
    }
  }

  handleTimeChange(e) {
    this.showControls(); // keeps controls visible during drag event

    const videoEl = this.videoPlayer.current;
    videoEl.currentTime = e.target.value;
    this.setState({ currentPlayerTime: videoEl.currentTime });
  }

  jumpBack() {
    const videoEl = this.videoPlayer.current;
    videoEl.currentTime -= 10;

    this.setState({ currentPlayerTime: videoEl.currentTime });
  }

  jumpForward() {
    const videoEl = this.videoPlayer.current;
    videoEl.currentTime += 10;

    this.setState({ currentPlayerTime: videoEl.currentTime });
  }

  // the wrapper for the entire player runs requestFullscreen so that the
  // controls are fullscreened alongside the video player
  openFullscreen() {
    const entireVideoEl = this.fullControlArea.current;

    if (entireVideoEl.requestFullscreen) {
      entireVideoEl.requestFullscreen();
    } else if (entireVideoEl.mozRequestFullScreen) {
      /* Firefox */
      entireVideoEl.mozRequestFullScreen();
    } else if (entireVideoEl.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      entireVideoEl.webkitRequestFullscreen();
    } else if (entireVideoEl.msRequestFullscreen) {
      /* IE/Edge */
      entireVideoEl.msRequestFullscreen();
    }

    if (this._isMounted) this.setState({ fullscreen: true });
  }

  closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      /* Firefox */
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      /* IE/Edge */
      document.msExitFullscreen();
    }

    if (this._isMounted) this.setState({ fullscreen: false });
  }

  // this method is run whenever the mouse moves anywhere over the video player
  // on the first move, the controls will appear and it will set a timer to
  // hide the controls in 3 seconds if the mouse hasn't moved afterwards.
  // if it is still moving before the timer ends, the timer is reset
  showControls() {
    const { started, paused, mouseMoving } = this.state;
    clearTimeout(this.awayTimer);

    if (mouseMoving) {
      clearTimeout(this.timeout);

      this.timeout = setTimeout(() => {
        this._hideControls();

        if (started && paused) {
          this.awayTimer = setTimeout(() => {
            if (this._isMounted && started) this.setState({ away: true });
          }, 3000);
        }
      }, 3000);
    } else if (started && this._isMounted) {
      this.setState({ mouseMoving: true, hidden: false });

      this.timeout = setTimeout(() => {
        this._hideControls();

        if (paused) {
          this.awayTimer = setTimeout(() => {
            if (this._isMounted) this.setState({ away: true });
          }, 3000);
        }
      }, 3000);
    }
  }

  _hideControls() {
    if (this._isMounted) this.setState({ hidden: true, mouseMoving: false });
  }

  _tick() {
    if (this.videoPlayer.current && this._isMounted) {
      this.setState({
        currentPlayerTime: this.videoPlayer.current.currentTime
      });
    }
  }

  _hideAway() {
    if (this._isMounted) this.setState({ away: false });
  }

  findAudioIcon(keypress = false) {
    const { muted, volume } = this.state;

    if (muted || volume === 0) {
      return keypress ? (
        <i className="fas fa-volume-mute keypress"></i>
      ) : (
        <i className="fas fa-volume-mute"></i>
      );
    } else if (volume > 0.5) {
      return keypress ? (
        <i className="fas fa-volume-up keypress"></i>
      ) : (
        <i className="fas fa-volume-up"></i>
      );
    } else {
      return keypress ? (
        <i className="fas fa-volume-down keypress"></i>
      ) : (
        <i className="fas fa-volume-down"></i>
      );
    }
  }

  findKeyPress() {
    const { currentKey, paused, muted } = this.state;

    let keyVisual = null;
    if (currentKey !== null) {
      switch (currentKey) {
        case "play/pause":
          keyVisual = paused ? (
            <i className="fas fa-pause keypress"></i>
          ) : (
            <i className="fas fa-play keypress"></i>
          );
          break;
        case "volumeUp":
          keyVisual = this.findAudioIcon(true);
          break;
        case "volumeDown":
          keyVisual = this.findAudioIcon(true);
          break;
        case "mute/unmute":
          keyVisual = muted ? (
            <i className="fas fa-volume-mute keypress"></i>
          ) : (
            this.findAudioIcon(true)
          );
          break;
        case "jumpForward":
          keyVisual = <i className="fas fa-redo keypress"></i>;
          break;
        case "jumpBack":
          keyVisual = <i className="fas fa-undo keypress"></i>;
          break;
        default:
          break;
      }
    }

    // if ( keyVisual !== null ) {
    //     keyVisual.className += "keypress";
    // }

    return keyVisual;
  }

  backToBrowse() {
    const videoEl = this.videoPlayer.current;

    if (!videoEl.paused) {
      // pauses the video so that it's audio doesn't play into the next page
      videoEl.pause();
    }

    this.props.history.push("/browse");
  }

  removeFromMyList() {
    const { currentUserId, show } = this.props;

    this.props.removeMyListVideo(currentUserId, show.id);
  }

  render() {
    const {
      paused,
      currentPlayerTime,
      volume,
      muted,
      hidden,
      fullscreen,
      away,
      started,
      currentKey
    } = this.state;
    const { video, show } = this.props;
    let awayAnimation = "";
    let runtime = video ? video.runtime : 0;

    let playPauseBtn = null,
      remainingTime = null,
      audioIcon = null,
      volumeStyle = null,
      timeStyle = null,
      controlStyle = null;

    if (!started && this.videoPlayer.current !== null) {
      this.videoPlayer.current.load();
    }

    // once the main show and video have been loaded, these variables can  be asigned
    if (this.videoPlayer.current !== null) {
      playPauseBtn = paused ? (
        <i className="fas fa-play"></i>
      ) : (
        <i className="fas fa-pause"></i>
      );
      remainingTime = Math.floor(runtime - currentPlayerTime);
      const currProgress = (currentPlayerTime / runtime) * 100; // in percent value
      const currVolume = muted ? 0 : volume;

      // creates a progress bar look using a linear gradient in the bg. calculated using currProgress and total runtime
      timeStyle = {
        background: `linear-gradient( to right, red 0%, red ${currProgress}%, #7c7c7c ${currProgress}% , #7c7c7c ${remainingTime}%)`
      };
      volumeStyle = {
        background: `linear-gradient( to right, red 0%, red ${currVolume *
          100}%, #7c7c7c ${currVolume * 100}%, #7c7c7c ${(1 - currVolume) *
          100}% )`
      };

      // determines whether or not the controls are hidden
      controlStyle = {
        opacity: `${hidden ? 0 : 1}`
      };

      if (started && away === true) {
        awayAnimation = "reveal-away";
      } else if (started && away === false) {
        awayAnimation = "hide-away";
      } else {
        awayAnimation = "hidden-away";
      }

      audioIcon = this.findAudioIcon();
    }
    let keypressIcon = this.findKeyPress();
    let keypressComponent = null;
    if (keypressIcon !== null) {
      if (currentKey === "jumpForward") {
        keypressComponent = (
          <figure
            className="keypress-visual right-align"
            onAnimationEnd={() => this.setState({ currentKey: null })}
          >
            <i className="fas fa-circle"></i>
            {keypressIcon}
            <span>10</span>
          </figure>
        );
      } else if (currentKey === "jumpBack") {
        keypressComponent = (
          <figure
            className="keypress-visual left-align"
            onAnimationEnd={() => this.setState({ currentKey: null })}
          >
            <i className="fas fa-circle"></i>
            {keypressIcon}
            <span>10</span>
          </figure>
        );
      } else {
        keypressComponent = (
          <figure
            className="keypress-visual center-align"
            onAnimationEnd={() => this.setState({ currentKey: null })}
          >
            <i className="fas fa-circle"></i>
            {keypressIcon}
          </figure>
        );
      }
    }

    // decides the current button in the fullscreen slot
    let fullscreenBtn, fullscreenFunc;
    if (fullscreen === true) {
      fullscreenBtn = <i className="fas fa-compress"></i>;
      fullscreenFunc = this.closeFullscreen;
    } else {
      fullscreenBtn = <i className="fas fa-expand"></i>;
      fullscreenFunc = this.openFullscreen;
    }

    return (
      <figure className="main-video-player" ref={this.fullControlArea}>
        <div className="Video-Container">
          <video
            className="main-video-tag"
            ref={this.videoPlayer}
            // poster={window.tempBgURL} // black backgroud when the video hasn't loaded
            onCanPlay={this.videoReady} // starts playing when loaded
            onEnded={this.removeFromMyList}
            preload="true"
            controls={false}
            muted="muted"
          >
            <source src={video ? video.videoUrl : ""} type="video/mp4" />
            Browser does not support the video tag
          </video>
        </div>

        <div className="all-player-controls">
          <div
            className="clickable-area"
            onClick={this.togglePlayPause}
            onKeyPress={this.togglePlayPause}
            onMouseMove={this.showControls}
          >
            {keypressComponent}
          </div>

          <article className="watch-maturity-details">
            <figure className="red-line"></figure>
            <h3>Rated {show ? show.maturity_rating : ""}</h3>
          </article>

          <div className={`away-screen ${awayAnimation}`}>
            <div className="away-screen-content" onMouseOver={this._hideAway}>
              <article
                className="away-screen-details"
                onMouseOver={() => {
                  if (away) this.showControls();
                }}
              >
                <span>You're watching</span>
                <h2>{show ? show.title : ""}</h2>
                <article className="away-screen-other-details">
                  <h6>{show ? show.year : ""}</h6>
                  <h6>{show ? show.maturity_rating : ""}</h6>
                  <h6>
                    {video ? DateTimeUTIL.secondsToHoursMinutes(runtime) : ""}
                  </h6>
                </article>
                <p>{show ? show.tagline : ""}</p>
              </article>

              <span className="away-screen-paused">Paused</span>
            </div>
          </div>

          <div className="full-control-area" style={controlStyle}>
            <a className="back-to-browse-btn" onClick={this.backToBrowse}>
              <i className="fas fa-arrow-left"></i>
              <span className="back-to-browse-message">Back to browse</span>
            </a>

            <div className="main-video-bottom-controls">
              <div className="progress-scrubber-wrapper">
                <figure className="scrubber-bar">
                  <input
                    type="range" // progress slider
                    className="slider time-slider"
                    min="0"
                    max={`${runtime}`}
                    step="0.1"
                    onChange={this.handleTimeChange}
                    onInput={this.handleTimeChange}
                    value={`${currentPlayerTime}`}
                    style={timeStyle}
                  />
                </figure>
                <span className="scrubber-remaining-time">
                  {DateTimeUTIL.secondsToTime(remainingTime)}
                </span>
              </div>

              <div className="Player-Controls-wrapper">
                <div className="Player-Controls">
                  <div className="left-controls">
                    <button
                      className="play-pause-toggle-btn"
                      onClick={this.togglePlayPause}
                    >
                      {playPauseBtn}
                    </button>

                    <button onClick={this.jumpBack} className="forward-10-btn">
                      <i className="fas fa-undo"></i>
                      <span>10</span>
                    </button>

                    <button onClick={this.jumpForward} className="back-10-btn">
                      <i className="fas fa-redo"></i>
                      <span>10</span>
                    </button>

                    <div className="audio-button-wrapper">
                      <button className="audio-btn" onClick={this.toggleMute}>
                        {audioIcon}
                      </button>
                      <figure className="audio-levels-popup">
                        <input
                          type="range"
                          className="slider volume-slider"
                          min="0.0"
                          max="1.0"
                          step="0.1"
                          onChange={this.handleVolumeChange}
                          onInput={this.handleVolumeChange}
                          value={`${volume}`}
                          style={volumeStyle}
                        />
                      </figure>
                    </div>

                    <article className="video-title-ep-name">
                      <span className="show-title">
                        {show ? show.title : null}
                      </span>
                      <span className="episode-name">
                        {show && video === "EPISODIC" ? video.name : null}
                      </span>
                    </article>
                  </div>

                  <div className="right-controls">
                    {/* <button className="episode-list-btn">
                                            <i className="fas fa-layer-group"></i>
                                        </button> */}

                    <button
                      className="fullscreen-toggle"
                      onClick={fullscreenFunc}
                    >
                      {fullscreenBtn}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </figure>
    );
  }
}

export default withRouter(Watch);
