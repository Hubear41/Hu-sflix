import React from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
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
            ended: false,
            next: false,
        };

        this.timeout;
        this.interval;
        this.videoPlayer = React.createRef();
        this.fullControlArea = React.createRef();
        this.videoSource = React.createRef();

        this.openFullscreen = this.openFullscreen.bind(this);
        this.closeFullscreen = this.closeFullscreen.bind(this);
        this.togglePlayPause = this.togglePlayPause.bind(this);
        this.toggleMute = this.toggleMute.bind(this);
        this.jumpBack = this.jumpBack.bind(this);
        this.jumpForward = this.jumpForward.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.handleVolumeChange = this.handleVolumeChange.bind(this);
        this.showControls = this.showControls.bind(this);
        this._hideControls = this._hideControls.bind(this);
        this._tick = this._tick.bind(this);
        this.backToBrowse = this.backToBrowse.bind(this);
        this.determineKeyPress = this.determineKeyPress.bind(this);
        this.revealNextShow = this.revealNextShow.bind(this);
        this.hideNextShow = this.hideNextShow.bind(this);
        this.startPlayer = this.startPlayer.bind(this);
        this.playNextShow = this.playNextShow.bind(this);
    }

    
    componentDidMount() {
        const { videoId, showId } = this.props.match.params;
        this.props.fetchShows();
        this.props.fetchVideo(videoId);
        this.props.fetchShow(showId);
        
        document.addEventListener('keydown', e => this.determineKeyPress(e));
        this.interval = setInterval(this._tick, 1000); //updates the timer each half second

    }

    determineKeyPress(e) {        
        switch (e.keyCode) {
            case 32:  // spacebar
                this.togglePlayPause();
                break;
            case 27:  // escape
                document.fullscreen ? this.closeFullscreen() : null;
                break;
            case 39:  // right arrow
                this.jumpForward();
                break;
            case 37:  // left arrow
                this.jumpBack();
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

    // componentDidUpdate(prevProps) {
    //     if (prevProps.match.params.showId !== this.props.match.params.showId ) {
    //         const { videoId, showId } = this.props.match.params;

    //         this.props.fetchShows();
    //         this.props.fetchVideo(videoId);
    //         this.props.fetchShow(showId);
    //     }
    // }

    startPlayer() {
        const videoEl = this.videoPlayer.current;

        videoEl.muted = false;
        videoEl.volume = 0.8;
        videoEl.play();
    }

    togglePlayPause(e) {   
        const videoEl = this.videoPlayer.current;
        
        if (videoEl.paused) {
            videoEl.play().then(
                () => this.setState({ paused: false }),
                () => this.setState({ paused: true })
            );
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
        videoEl.play();

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
        const controlArea = this.fullControlArea.current;

        if (controlArea.exitFullscreen) {
            controlArea.exitFullscreen();
        } else if (controlArea.mozCancelFullScreen) { /* Firefox */
            controlArea.mozCancelFullScreen();
        } else if (controlArea.webkitExitFullscreen) { /* Chrome, Safari and Opera */
            controlArea.webkitExitFullscreen();
        } else if (controlArea.msExitFullscreen) { /* IE/Edge */
            controlArea.msExitFullscreen();
        }

        this.setState({ fullscreen: false })
    }
    
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
        const controlArea = this.videoPlayer.current;
        
        if ( !videoEl.paused ) {
            videoEl.pause();
        }

        this.props.history.push('/browse');
    }

    revealNextShow() {
        this.closeFullscreen();    
        clearInterval(this.interval);

        this.setState({ ended: true });
    }

    hideNextShow() {
        if ( this.state.ended ) {
            this.setState({ ended: false });
        }
    }

    playNextShow() {
        // const source = this.videoSource.current;
        // const { nextShow } = this.props;

        // let nextVideoId = nextShow.show_type === 'FEATURE' ? nextShow.movie_id : nextShow.episode_ids[0];

        // source.setAttribute('src', `${nextVideoId.videoUrl}` );
        // this.videoPlayer = React.createRef();
        // this.props.history.push(`/watch/${nextShow.id}/${nextVideoId}`);

        this.setState({
            currentPlayerTime: 0,
            paused: false,
            fullscreen: false,
            muted: false,
            volume: 0.8,
            prevVolume: 0.8,
            hidden: true,
            mouseMoving: false,
            ended: false,
            next: false,
        });

    }

    render() {
        const { paused, currentPlayerTime, volume, muted, hidden, fullscreen, ended, next} = this.state;
        const { video, show, nextShow } = this.props;

        if ( next ) {
            return <Redirect to={`/watch/${nextShow.id}/${nextShow.show_type === "FEATURE" ? nextShow.movie_id : nextShow.episode_ids[0]}`} />;
        }

        let runtime = video ? video.runtime : 0;
        let playPauseBtn = null, remainingTime = null, audioIcon = null, volumeStyle = null, timeStyle = null, controlStyle = null;
        let smallPlayerClass =  '', disabledControls = null;

        if ( ended ) {
            smallPlayerClass = 'small-player';
            disabledControls = { display: 'none', cursor: 'pointer' };
        }

        if ( this.videoPlayer.current !== null ) {               
            playPauseBtn = paused ? <i className="fas fa-play"></i> : <i className="fas fa-pause"></i>
            remainingTime =  Math.floor(runtime - currentPlayerTime);
            const currProgress = (currentPlayerTime / runtime) * 100;
            const currVolume = muted ? 0 : volume;
            
            timeStyle = {
                background: `linear-gradient( to right, red 0%, red ${currProgress}%, #7c7c7c ${currProgress}% , #7c7c7c ${remainingTime}%)`
            }
            volumeStyle = {
                background: `linear-gradient( to right, red 0%, red ${currVolume * 100}%, #7c7c7c ${currVolume * 100}%, #7c7c7c ${(1 - currVolume) * 100}% )`
            };
            controlStyle = {
                opacity: `${ hidden ? 0 : 1 }`
            }
            audioIcon = this.findAudioIcon();
        }
        
        let fullscreenBtn, fullscreenFunc; 
        if ( fullscreen === true ) {
            fullscreenBtn = <i className="fas fa-compress"></i>;
            fullscreenFunc = this.closeFullscreen;
        } else {
            fullscreenBtn = <i className="fas fa-expand"></i>;
            fullscreenFunc = this.openFullscreen;
        }

        return (
            <section className="next-show-wrapper">
                <figure className={`main-video-player ${smallPlayerClass}`} ref={this.fullControlArea}> 
                    <div className="Video-Container">
                        <video  className="main-video-tag" 
                                ref={this.videoPlayer}
                                poster={window.tempBgURL} 
                                onCanPlay={this.togglePlayPause}
                                controls={false}
                                onEnded={this.revealNextShow}
                                > 
                            <source src={ video ? video.videoUrl : ''} ref={this.videoSource} />
                            Browser does not support the video tag
                        </video>
                    </div>

                    <div className="all-player-controls" style={disabledControls}>
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
                                        <input  type="range" 
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
                                    <span className="scrubber-remaining-time">{DateTimeUTIL.secondsToTime(remainingTime)}</span>
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

                <figure className="next-show-filter"></figure>
                <figure className="next-show-poster">
                    <img src={ show ? show.posterUrl : ''} />    
                </figure>
                
                <button className="next-show-back-arrow" onClick={this.backToBrowse}>
                    <figure className="back-arrow-icon">
                        <i className="far fa-circle"></i>
                        <i className="fas fa-arrow-left next-show-left-arrow"></i>
                        <span>Back to Browse</span>
                    </figure>
                </button>               

                <aside className="next-show-info-wrapper">

                    <article className="next-show-details">
                        <h5>A <strong>HU'SFLIX</strong> film</h5>
                        <article className="next-show-title">
                            <h1>{nextShow ? nextShow.title : ''}</h1>
                        </article>
                        <p>{nextShow ? nextShow.tagline : ''}</p>

                    </article>

                    <section className="next-show-buttons" onClick={this.playNextShow}>
                        <button className="next-show-play-btn" >
                            <i className="fas fa-play"></i>
                            Play
                        </button>
                        <button className="next-show-back-btn" onClick={this.backToBrowse}>
                            <span>Back To Browse</span>
                            <figure className="back-to-browse-bg"></figure>
                        </button>
                    </section>

                    {/* <figure className="next-show-video-img">
                        <img src={ nextShow ? nextShow.posterUrl : '' } alt="" className="next-show-title-card"/>
                    </figure> */}
                </aside>                          
            </section>
        );
    }
}

export default withRouter(Watch);