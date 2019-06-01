import React from 'react';
import { Link } from 'react-router-dom';

class Watch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPlayerTime: 0,
            paused: false,
            volume: 0.8,
            fullscreen: false,
        };
        this.videoPlayer = React.createRef();
        this.mainWindow = React.createRef();
        this.openFullscreen = this.openFullscreen.bind(this);
        this.togglePlayPause = this.togglePlayPause.bind(this);
        this.toggleMute = this.toggleMute.bind(this);
        this.jumpBack = this.jumpBack.bind(this);
        this.jumpForward = this.jumpForward.bind(this);
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
        const { volume } = this.state;
        
        // debugger
        if ( volume > 0.5 && volume <= 1.0 ) {
            return <i className="fas fa-volume-up"></i>;
        } else if ( volume <= 0.5 && volume > 0.0 ) {
            return <i className="fas fa-volume-down"></i>;
        } else {
            return <i className="fas fa-volume-mute"></i>;
        }
    }

    findHeight() {
        const windowEl = this.mainWindow.current;
        
    }

    toggleMute() {
        const videoEl = this.videoPlayer.current;

        if ( videoEl.muted ) {
            videoEl.muted = false;
        } else {
            videoEl.muted = false;
        }
    }

    jumpBack() {
        const videoEl = this.videoPlayer.current;
        videoEl.currentTime = videoEl.currentTime - 10;

        this.setState({ currentPlayerTime: videoEl.currentTime })
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

    render() {
        const { currentPlayerTime, paused } = this.state;
        const { video } = this.props;
        
        let playPauseBtn = null, scrubberProgress = null, remainingTime = null, audioBtn = null;

        if ( this.videoPlayer.current !== null ) {
            playPauseBtn = paused ? <i className="fas fa-play"></i> : <i className="fas fa-pause"></i>
            remainingTime = video.runtime - currentPlayerTime;
            scrubberProgress = (currentPlayerTime / video.runtime) * 100;
            audioBtn = this.findAudioIcon();
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
                    <div className="full-control-area" onClick={this.togglePlayPause} ref={this.mainWindow}>
                        <Link to="/browse" className="back-to-browse-btn">
                            <i className="fas fa-arrow-left"></i>
                            <h3>Back to browse</h3>
                        </Link>

                        <div className="main-video-bottom-controls">
                            <div className="progress-scrubber">
                                <figure className="scrubber-bar">
                                    <figure className="scrubber-bar-progress" style={{width: scrubberProgress}}>
                                        <input type="range"/>
                                        <i className="fas fa-circle scrubber-head"></i>
                                    </figure>
                                </figure>
                                <span>{remainingTime}</span>
                            </div>

                            <div className="Player-Controls">
                                <div className="left-controls">
                                    <button className="play-pause-toggle-btn">{playPauseBtn}</button>

                                    <button onClick={this.jumpForward} className='forward-10-btn'>
                                        <i className="fas fa-undo"></i>
                                    </button>

                                    <button onClick={this.jumpBack} className='back-10-btn'>
                                        <i className="fas fa-redo"></i>
                                    </button>

                                    <button className="audio-btn" onClick={this.toggleMute}>{audioBtn}
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
            </figure>
        );
    }
}

export default Watch;