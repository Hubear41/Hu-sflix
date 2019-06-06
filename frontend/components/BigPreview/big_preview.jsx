import React from 'react'
import { withRouter } from 'react-router-dom'

class BigPreview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            started: false,
            muted: true,
            imageOpacity: 1,
            ended: false,
        };
        this.videoPlayer = React.createRef();
        this.poster = React.createRef();
        // this.videoReady = this.videoReady.bind(this);
        this.videoEnded = this.videoEnded.bind(this);
        this.revealVideo = this.revealVideo.bind(this);
        this.pauseVideo = this.pauseVideo.bind(this);
        this.launchWatch = this.launchWatch.bind(this);
        this.videoControllerIcon = this.videoControllerIcon.bind(this);
        this.toggleMute = this.toggleMute.bind(this);
    }
    
    componentDidMount() {
        const { previewId } = this.props;
        this.props.requestVideo(previewId);
        
        window.addEventListener('scroll', () => this.pauseVideo());
    }

    toggleMute() {
        const videoEl = this.videoPlayer.current;

        if ( videoEl.muted ) {
            videoEl.muted = false;
            this.setState({ muted: false });
        } else {
            videoEl.muted = true;
            this.setState({ muted: true });
        }
    }

    videoReady() {        
        setTimeout( () => this.revealVideo(), 2000);
    }

    revealVideo() {
        const videoEl = this.videoPlayer.current;

        videoEl.play();
        this.setState({ imageOpacity: 0, ended: false, started: true });
    }

    pauseVideo() {
        const videoEl = this.videoPlayer.current;
        
        if ( !videoEl.paused ) {
            setTimeout( () => {
                this.videoPlayer.current.pause();
                this.setState({ imageOpacity: 1, ended: true });
            }, 1000);
        }
    }

    videoControllerIcon() {
        const { muted, started, ended } = this.state;
        
        if ( !started ) {
            return null;
        }

        if ( ended ) {
            return <i className="fas fa-redo"></i>
        } else if ( !muted) {
            return <i className="fas fa-volume-up"></i>
        } else {
            return <i className="fas fa-volume-mute"></i>
        }
    }

    videoFunction() {
        const { ended } = this.state;

        if ( ended ) {
            return this.revealVideo;
        } else {
            return this.toggleMute;
        }
    }

    videoEnded() {
        this.setState({ imageOpacity: 1, ended: true});
    }

    launchWatch() {
        const { show } = this.props;

        if ( show.show_type === 'FEATURE') {
            this.props.history.push(`/watch/${show.id}/${show.movie_id}`);
        } else {
            this.props.history.push(`/watch/${show.id}/${show.episode_ids[0]}`);
        }
    }

    render() {
        const { show, video } = this.props;
        const { imageOpacity, started } = this.state;
        const videoOpacity = imageOpacity === 1 ? 0 : 1;
        
        const buttonIcon = this.videoPlayer.current ? this.videoControllerIcon() : null;
        const buttonFunc = this.videoPlayer.current ? this.videoFunction() : null;
        const iconStyle = started ? { opacity: 1 } : { opacity: 0 };

        return (
            <figure className="big-video-preview-wrapper">
                <section className="big-video-poster" style={{ opacity: imageOpacity }}>
                    <img src={show && show.posterUrl ? show.posterUrl : window.tempBgURL} 
                        className="preview-poster"
                        ref={this.poster}
                    ></img>
                    <figure className="poster-black-bg"></figure>
                </section>

                <section className="video-el-wrapper" style={{ opacity: videoOpacity }}>
                    <figure className="big-video-bg"></figure>
                    {/* <video  controls={true}
                            muted
                            className="big-video"
                            ref={this.videoPlayer}
                            // onCanPlayThrough={this.videoReady}
                            onEnded={this.videoEnded}
                    >
                        { video && video.videoUrl ? <source src={video.videoUrl} type="video/mp4" /> : null }
                    </video> */}
                </section>

                <article className="big-preview-left-controls">
                    <article className="big-preview-show-title">
                        <h3><strong>Hu'sflix</strong> Original</h3>
                        <article className="title-wrapper">
                            <h1>{show.title}</h1>
                        </article>
                    </article>

                    <div className="big-preview-play-mylist-btns">
                        <button className="big-preview-play" onClick={this.launchWatch}>
                            <h4>
                                <i className="fas fa-play"></i> 
                                <span>Play</span>
                            </h4>
                            <div className="big-preview-btn-bg"></div>
                        </button>
                        <button className="big-preview-myList">
                            <h4>
                                <i className="fas fa-plus"></i>
                                <span>My List</span> 
                            </h4>
                            <div className="big-preview-btn-bg"></div>
                        </button>
                    </div>

                    <p className="big-preview-show-tagline" style={{ opacity: imageOpacity }}>
                        <span>{show.tagline}</span>
                    </p>
                </article>
                            
                <figure className="big-preview-right-content">
                    <article className="preview-maturity-wrapper">
                        <figure className="maturity-bg"></figure>
                        <h6>{show.maturity_rating}</h6>
                    </article>
                    <button className="big-preview-video-controls" style={iconStyle} onClick={buttonFunc}>
                        <div className="preview-icon">
                            <div className="preview-current-icon">
                                {buttonIcon}
                            </div>
                            <i className="fas fa-circle preview-circle"></i>
                            <i className="far fa-circle preview-outline"></i>
                        </div>
                    </button>
                </figure>
            </figure>
        );
    }
}

export default withRouter(BigPreview);