import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import * as DateTimeUTIL from '../../util/date_time_util';

class Watch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPlayerTime: 0,
            paused: false,
            fullscreen: false,
            muted: false,
            volume: 0.8,
            prevVolume: 0.8,
            hidden: true,
            mouseMoving: false,
            loaded: false,
        };
        this.timeout;
        this.videoPlayer = React.createRef();
        this.fullControlArea = React.createRef();

        // all video player methods
        this.openFullscreen = this.openFullscreen.bind(this);
        this.closeFullscreen = this.closeFullscreen.bind(this);
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
        this.backToBrowse = this.backToBrowse.bind(this);
        this.determineKeyPress = this.determineKeyPress.bind(this);
    }

    
    componentDidMount() {
        const { showId } = this.props.match.params;
        this.props.fetchShow(showId);
        
        setInterval(this._tick, 1000); //updates the timer each half second
        document.addEventListener('keydown', e => this.determineKeyPress(e));
    }

    determineKeyPress(e) {        
        switch (e.keyCode) {
            case 13:  // enter
                this.togglePlayPause();
                break;
            case 32:  // spacebar
                this.togglePlayPause();
                break;
            case 27:  // escape
                document.fullscreen ? this.closeFullscreen() : null;
                break;
            case 38: // up arrow
                this.changeVolume( 0.1 );
                break;
            case 40: // down arrow
                this.changeVolume( -0.1 );
                break;
            case 39:  // right arrow
                this.jumpForward();
                break;
            case 37:  // left arrow
                this.jumpBack();
                break;
            case 77: // m key
                this.toggleMute();
                break;
            case 70:  // f key
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

    // componentDidUpdate() {
    //     if ( this.state.loaded === false ) {
    //         this.videoPlayer.current.load();
    //         this.setState({ loaded: true });
    //     }
    // }

    togglePlayPause() {   
        const { paused } = this.state;
        const videoEl = this.videoPlayer.current;
        
        // play() returns a promise obj
        // the state is only changed if play works 
        // prevents the play button from changing until it can play
        if (paused) {
            videoEl.play().then( () => {
                this.setState({ paused: false });
            });
        } else {
            videoEl.pause();
            this.setState({ paused: true });
        }
    }

    findAudioIcon() {
        const { muted, volume } = this.state;
        
        if ( muted || volume === 0 ) {
            return <i className="fas fa-volume-mute"></i>;
        } else if ( volume > 0.5 ) {
            return <i className="fas fa-volume-up"></i>;
        } else {
            return <i className="fas fa-volume-down"></i>;
        }
    }

    toggleMute() {
        const { muted, volume,  prevVolume } = this.state;
        const videoEl = this.videoPlayer.current;
        const currVolume = volume === 0 ? 0.1 : volume;

        // if audio has been muted, this resets the audio level back to it's 
        // previous amount. 
        // otherwise, this saves the current volume and set volume to 0
        // volume is set to 0 incase the user tries to change the volume manually
        if ( muted ) {
            videoEl.muted = false;
            videoEl.volume = prevVolume;
            this.setState({ muted: false, volume: prevVolume })
        } else {
            videoEl.muted = true;
            videoEl.volume = 0;
            this.setState({ muted: true, volume: 0, prevVolume: currVolume })
        }
    }

    // only used for the up and down arrow keys
    changeVolume(amount) {
        const videoEl = this.videoPlayer.current;
        let newVolume = videoEl.volume + amount;

        if ( newVolume > 1 ) {
            newVolume = 1;
        } else if ( newVolume < 0 ) {
            newVolume = 0;
        } 

        videoEl.volume = newVolume;
        this.setState({ volume: newVolume });
    }

    // this method is used whenever the user grabs the thumb of the audio input.
    // as well as changing volume, this method also makes sure to adjust the mute
    // variable as well.
    handleVolumeChange(e) {
        const videoEl = this.videoPlayer.current;
        videoEl.volume = e.target.value;

        if (videoEl.volume === 0) {
            videoEl.muted = true;
            this.setState({ volume: videoEl.volume, muted: true, prevVolume: 0.1 })
        } else if( videoEl.muted ) {
            videoEl.muted = false;
            this.setState({ volume: videoEl.volume, muted: false})
        } else {
            this.setState({ volume: videoEl.volume })
        }
    }
    
    handleTimeChange(e) {
        const videoEl = this.videoPlayer.current;
        videoEl.currentTime = e.target.value;
        this.setState({ currentPlayerTime: videoEl.currentTime })
    }

    jumpBack() {
        const videoEl = this.videoPlayer.current;
        videoEl.currentTime -= 10;

        this.setState({ currentPlayerTime: videoEl.currentTime })
    }
    
    jumpForward() {
        const videoEl = this.videoPlayer.current;
        videoEl.currentTime += 10;

        this.setState({ currentPlayerTime: videoEl.currentTime })
    }
    
    // the wrapper for the entire player runs requestFullscreen so that the 
    // controls are fullscreened alongside the video player
    openFullscreen() {
        const entireVideoEl = this.fullControlArea.current;

        if (entireVideoEl.requestFullscreen) {
            entireVideoEl.requestFullscreen();
        } else if (entireVideoEl.mozRequestFullScreen) { /* Firefox */
            entireVideoEl.mozRequestFullScreen();
        } else if (entireVideoEl.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
            entireVideoEl.webkitRequestFullscreen();
        } else if (entireVideoEl.msRequestFullscreen) { /* IE/Edge */
            entireVideoEl.msRequestFullscreen();
        }

        this.setState({ fullscreen: true })
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

        this.setState({ fullscreen: false })
    }

    // this method is run whenever the mouse moves anywhere over the video player
    // on the first move, the controls will appear and it will set a timer to 
    // hide the controls in 3 seconds if the mouse hasn't moved afterwards.
    // if it is still moving before the timer ends, the timer is reset
    showControls() {
        if ( this.state.mouseMoving ) {
            clearTimeout(this.timeout);
            this.timeout = setTimeout( () => {
                this._hideControls();
            }, 3000);
        } else {
            this.setState({ mouseMoving: true, hidden: false });
            this.timeout = setTimeout( () => {
                this._hideControls();
            }, 3000);
        }
    }
    
    _hideControls() {
        this.setState({ hidden: true, mouseMoving: false })
    }
    
    _tick() {
        if (this.videoPlayer.current) {
            this.setState({ currentPlayerTime: this.videoPlayer.current.currentTime })
        }
    }

    backToBrowse() {
        const videoEl = this.videoPlayer.current;

        if ( !videoEl.paused ) { // pauses the video so that it's audio doesn't play into the next page
            videoEl.pause();
        }

        this.props.history.push('/browse');
    }

    render() {
        const { paused, currentPlayerTime, volume, muted, hidden, fullscreen } = this.state;
        const { video, show } = this.props;
        let runtime = video ? video.runtime : 0;
        let playPauseBtn = null, remainingTime = null, audioIcon = null, volumeStyle = null, timeStyle = null, controlStyle = null;

        // once the main show and video have been loaded, these variables can  be asigned
        if ( this.videoPlayer.current !== null ) {               
            playPauseBtn = paused ? <i className="fas fa-play"></i> : <i className="fas fa-pause"></i>
            remainingTime =  Math.floor(runtime - currentPlayerTime);
            const currProgress = (currentPlayerTime / runtime) * 100; // in percent value
            const currVolume = muted ? 0 : volume;
            
            // creates a progress bar look using a linear gradient in the bg. calculated using currProgress and total runtime
            timeStyle = { 
                background: `linear-gradient( to right, red 0%, red ${currProgress}%, #7c7c7c ${currProgress}% , #7c7c7c ${remainingTime}%)`
            }
            volumeStyle = {
                background: `linear-gradient( to right, red 0%, red ${currVolume * 100}%, #7c7c7c ${currVolume * 100}%, #7c7c7c ${(1 - currVolume) * 100}% )`
            };
            // determines whether or not the controll are hidden
            controlStyle = {
                opacity: `${ hidden ? 0 : 1 }`
            }
            audioIcon = this.findAudioIcon();
        }

        // decides the current button in the fullscreen slot
        let fullscreenBtn, fullscreenFunc; 
        if ( fullscreen === true ) {
            fullscreenBtn = <i className="fas fa-compress"></i>;
            fullscreenFunc = this.closeFullscreen;
        } else {
            fullscreenBtn = <i className="fas fa-expand"></i>;
            fullscreenFunc = this.openFullscreen;
        }
        
        return (
            <figure className="main-video-player" ref={this.fullControlArea}> 
                
                <div className="Video-Container">
                    <video  className="main-video-tag" 
                            ref={this.videoPlayer}
                            poster={window.tempBgURL} // black backgroud when the video hasn't loaded
                            onCanPlay={this.togglePlayPause} // starts playing when loaded
                            controls={false}
                            > 
                        <source src={video ? video.videoUrl : ''} />

                        Browser does not support the video tag
                    </video>
                </div>

                <div className="all-player-controls"> 
                    <div className="clickable-area" 
                         onClick={this.togglePlayPause} 
                         onKeyPress={this.togglePlayPause}
                         onMouseMove={this.showControls} 
                    ></div>

                    <div className="full-control-area" style={controlStyle}>
                        <a className="back-to-browse-btn" onClick={this.backToBrowse}>
                            <i className="fas fa-arrow-left"></i>
                            <span className="back-to-browse-message">Back to browse</span>
                        </a>

                        <div className="main-video-bottom-controls">
                            <div className="progress-scrubber-wrapper">
                                <figure className="scrubber-bar"> 
                                    <input  type="range"   // progress slider
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
                                        <button className="play-pause-toggle-btn" 
                                                onClick={this.togglePlayPause}
                                        >
                                                    {playPauseBtn}
                                        </button>

                                        <button onClick={this.jumpBack} className='forward-10-btn'>
                                            <i className="fas fa-undo"></i>
                                            <span>10</span>
                                        </button>

                                        <button onClick={this.jumpForward} className='back-10-btn'>
                                            <i className="fas fa-redo"></i>
                                            <span>10</span>
                                        </button>

                                        <div className="audio-button-wrapper">
                                            <button className="audio-btn" onClick={this.toggleMute}>
                                                {audioIcon}
                                            </button>
                                            <figure className="audio-levels-popup">
                                                <input  type="range" 
                                                        className="slider volume-slider"
                                                        min='0.0' 
                                                        max='1.0'
                                                        step="0.1"
                                                        onChange={this.handleVolumeChange}
                                                        onInput={this.handleVolumeChange}
                                                        value={`${volume}`}
                                                        style={volumeStyle}
                                                />
                                            </figure>
                                        </div>
                                                                    
                                        <article className="video-title-ep-name">
                                            <span className="show-title">{show ? show.title : null}</span>
                                            <span className="episode-name">{show && video === "EPISODIC" ? video.name : null}</span>
                                        </article>
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

export default withRouter(Watch);