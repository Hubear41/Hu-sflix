import React from 'react';
import { Link } from 'react-router-dom';

class Watch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            player: null,
            currentPlayerTime: 0,
        }
    }

    componentDidMount() {
        const player = document.findElementById('main-video-tag')

        this.setState({ player });
    }

    togglePlayPause() {
        const { player } = this.state;

        if (player.paused) {
            player.play();
        } else {
            player.pause();
        }

        this.setState({ player });
    }

    findAudioLevel() {
        const { player } = this.state;

        if ( player.volume > 0.5 && player.volume <= 1.0 ) {
            return <i className="fas fa-volume-up"></i>
        } else if ( player.volumn <= 0.5 && player.volumn > 0.0 ) {
            return <i className="fas fa-volume-down"></i>
        } else {
            return <i className="fas fa-volume-mute"></i>
        }
    }

    toggleMute() {
        const { player } = this.state;

        if ( player.muted ) {
            player.muted = false;
        } else {
            player.muted = false;
        }

        this.setState({ player });
    }

    jumpBack() {
        const { player } = this.state;
        player.currentTime = player.currentTime - 10;

        this.setState({ player });
    }

    jumpForward() {
        const { player } = this.state;
        player.currentTime = player.currentTime + 10;

        this.setState({ player });
    }
    
    openFullscreen() {
        const { player } = this.state;

        if (player.requestFullscreen) {
            player.requestFullscreen();
        } else if (player.mozRequestFullScreen) { /* Firefox */
            player.mozRequestFullScreen();
        } else if (player.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
            player.webkitRequestFullscreen();
        } else if (player.msRequestFullscreen) { /* IE/Edge */
            player.msRequestFullscreen();
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
        const { player, currentPlayerTime } = this.state;
        const { video } = this.props;

        const playPauseBtn = player.paused ? <i className="fas fa-play"></i> : <i className="fas fa-pause"></i>
        const audioBtn = this.findAudioLevel();
        const fullscreenBtn = window.fullScreen ? <button><i className="fas fa-compress"></i></button> 
                                                : <button><i className="fas fa-expand"></i></button>

        const remainingTime = video.runtime - currentPlayerTime;
        const scrubberProgress = (currentPlayerTime / video.runtime) * 100;

        return (
            <figure className="main-video-player"> 
                
                <div className="Video-Container">
                    <video src="video.video_url" id="main-video-tag" autoplay> 

                    </video>
                </div>

                <div className="all-Player-Controls">
                    <Link to="/browse">
                        <i class="fas fa-arrow-left"></i>
                        <h3>Back to browse</h3>
                    </Link>

                    <div className="full-control-area" onClick={togglePlayPause}>
                        <div className="main-video-bottom-controls">
                            <div className="progress-scrubber">
                                <figure className="scrubber-bar"></figure>
                                <figure className="scrubber-progress">
                                    <figure className="scrubber-bar-progress" style={{width: scrubberProgress}}>
                                        <i className="fas fa-circle scrubber-head"></i>
                                    </figure>
                                </figure>
                                <span>{remainingTime}</span>
                            </div>

                            <div className="Player-Controls">
                                <button>{playPauseBtn}</button>

                                <button onClick={this.jumpForward}>
                                    <i className="fas fa-undo"></i>
                                </button>

                                <button onClick={this.jumpBack}>
                                    <i className="fas fa-redo"></i>
                                </button>

                                <div className="audio-btn-wrapper">
                                    <button onClick={toggleMute}>{audioBtn}</button>
                                    <figure className="audio-levels"></figure>
                                </div>
                        
                                <span>{video.name}</span>

                                <i className="fas fa-layer-group"></i>

                                {fullscreenBtn}
                            </div>
                        </div>
                    </div>
                </div>



            </figure>
        );
    }
}

export default Watch;