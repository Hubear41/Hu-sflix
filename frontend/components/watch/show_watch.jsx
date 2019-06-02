import React from 'react';
import { Link } from 'react-router-dom';
import * as DateTimeUTIL from '../../util/date_time_util';

class Watch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPlayerTime: 0,
            paused: false,
            fullscreen: false,
            muted: false,
        };
        this.videoPlayer = React.createRef();
        this.openFullscreen = this.openFullscreen.bind(this);
        this.togglePlayPause = this.togglePlayPause.bind(this);
        this.toggleMute = this.toggleMute.bind(this);
        this.jumpBack = this.jumpBack.bind(this);
        this.jumpForward = this.jumpForward.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this._tick = this._tick.bind(this);
        
        setInterval(this._tick, 500); //updates the timer each half second
    }

    componentDidMount() {
        const { videoId } = this.props.match.params;
        this.props.fetchVideo(videoId);
    }

    togglePlayPause() {   
        const videoEl = this.videoPlayer.current;

        if (videoEl.paused) {
            videoEl.play();
            this.setState({ paused: false });
        } else {
            videoEl.pause();
            this.setState({ paused: true });
        }
    }

    findAudioIcon() {
        const videoEl = this.videoPlayer.current;
        const volume = videoEl.volume || 0.8;
        
        if ( videoEl.muted || volume === 0 ) {
            return <i className="fas fa-volume-mute"></i>;
        } else if ( volume > 0.5 ) {
            return <i className="fas fa-volume-up"></i>;
        } else {
            return <i className="fas fa-volume-down"></i>;
        }
    }

    toggleMute() {
        const videoEl = this.videoPlayer.current;
        
        if ( videoEl.muted ) {
            videoEl.muted = false;
            this.setState({ muted: false })
        } else {
            videoEl.muted = true;
            this.setState({ muted: true })
        }
    }

    jumpBack() {
        const videoEl = this.videoPlayer.current;
        videoEl.currentTime = videoEl.currentTime - 10;

        this.setState({ currentPlayerTime: videoEl.currentTime })
    }

    handleChange(e) {
        this.setState({ currentPlayerTime: e.target.value })
    }

    jumpForward() {
        const videoEl = this.videoPlayer.current;
        videoEl.currentTime = videoEl.currentTime + 10;

        this.setState({ currentPlayerTime: videoEl.currentTime })
    }
    
    openFullscreen() {
        const videoEl = this.videoPlayer.current;

        if (videoEl.requestFullscreen) {
            videoEl.requestFullscreen();
        } else if (videoEl.mozRequestFullScreen) { /* Firefox */
            videoEl.mozRequestFullScreen();
        } else if (videoEl.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
            videoEl.webkitRequestFullscreen();
        } else if (videoEl.msRequestFullscreen) { /* IE/Edge */
            videoEl.msRequestFullscreen();
        }
    }

    closeFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { /* Firefox */
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE/Edge */
            document.msExitFullscreen();
        }
    }

    _tick() {
        this.setState({ currentPlayerTime: this.videoPlayer.current.currentTime })
    }

    render() {
        const { paused, currentPlayerTime } = this.state;
        const { video } = this.props;
        
        let playPauseBtn = null, scrubberProgress = null, remainingTime = null, audioIcon = null;

        if ( this.videoPlayer.current !== null ) {
            const videoEl = this.videoPlayer.current;
            // debugger
            playPauseBtn = paused ? <i className="fas fa-play"></i> : <i className="fas fa-pause"></i>
            remainingTime =  Math.floor(60 - currentPlayerTime); //change to video.runtime
            scrubberProgress = (currentPlayerTime / 60) * 100; //change to video.runtime
            audioIcon = this.findAudioIcon();
        }

        let fullscreenBtn, fullscreenFunc; 
        
        if ( window.fullScreen ) {
            fullscreenBtn = <i className="fas fa-compress"></i>;
            fullscreenFunc = this.closeFullscreen;
        } else {
            fullscreenBtn = <i className="fas fa-expand"></i>;
            fullscreenFunc = this.openFullscreen;
        }

        return (
            <figure className="main-video-player"> 
                
                <div className="Video-Container">
                    <video  className="main-video-tag" 
                            ref={this.videoPlayer}
                            poster={window.tempBgURL} 
                            autoPlay
                            controls={false}
                            > 
                        <source src={window.video}
                                type="video/mp4"
                                />
                        Browser does not support the video tag
                    </video>
                </div>

                <div className="all-player-controls">
                    <div className="full-control-area">
                        <Link to="/browse" className="back-to-browse-btn">
                            <i className="fas fa-arrow-left"></i>
                            <span className="back-to-browse-message">Back to browse</span>
                        </Link>

                        <div className="main-video-bottom-controls">
                            <div className="progress-scrubber-wrapper">
                                <figure className="scrubber-bar">
                                    <figure className="scrubber-bar-progress">
                                        <input  type="range" 
                                                min="0" 
                                                max={`${this.videoPlayer.duration}`} 
                                                onChange={this.handleChange} 
                                                step="1"
                                                value={`${scrubberProgress}`} 
                                        />
                                    </figure>
                                </figure>
                                <span>{DateTimeUTIL.secondsToTime(remainingTime)}</span>
                            </div>

                            <div className="Player-Controls-wrapper">
                                <div className="Player-Controls">
                                    <div className="left-controls">
                                        <button className="play-pause-toggle-btn" onClick={this.togglePlayPause}>{playPauseBtn}</button>

                                        <button onClick={this.jumpBack} className='forward-10-btn'>
                                            <i className="fas fa-undo"></i>
                                            <span>10</span>
                                        </button>

                                        <button onClick={this.jumpForward} className='back-10-btn'>
                                            <i className="fas fa-redo"></i>
                                            <span>10</span>
                                        </button>

                                        <button className="audio-btn" onClick={this.toggleMute}>
                                            {audioIcon}
                                            {/* <figure className="audio-levels-popup"></figure> */}
                                        </button>
                                                                    
                                        <span className="video-name">{ video ? video.name : null }</span>
                                    </div>    
                                    
                                    <div className="right-controls">
                                        {/* <button className="episode-list-btn">
                                            <i className="fas fa-layer-group"></i>
                                        </button> */}

                                        <button className="fullscreen-toggle" onClick={fullscreenFunc}>
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

export default Watch;