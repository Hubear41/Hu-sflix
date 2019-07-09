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
            mylistState: "My List",
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
        this.toggleMyList = this.toggleMyList.bind(this);
    }
    
    componentDidMount() {
        const { previewId, isPreviewing } = this.props;
        const { ended } = this.state;
        this.props.requestVideo(previewId);
        
        window.addEventListener('scroll', () => {
            let bigPreview = this.entirePreview.current;

            if ( isPreviewing ) {
                this.pauseVideo();
            } else if ( bigPreview ) {
                const scrollHeight = document.documentElement.scrollTop || document.body.scrollTop;

                // debugger
                if ( !ended && scrollHeight > (bigPreview.scrollHeight / 4) ) {
                    this.pauseVideo();
                } else if ( !ended && scrollHeight <= (bigPreview.scrollHeight / 4) ) {
                    this.playVideo();
                }
            }
        });
    }

    componentDidUpdate() {
        const { isPreviewing } = this.props;
        const { ended } = this.state;

        if ( isPreviewing && !ended ) {
            this.pauseVideo();
        } else if ( !isPreviewing && !ended ) {
            this.playVideo();
        }
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

    playVideo() {
        const videoEl = this.videoPlayer.current;
        let bigPreview = this.entirePreview.current;
        // const { isPreviewing } = this.props;

        if ( window.pageYOffset < bigPreview.scrollHeight / 3 && videoEl.paused ) {
            setTimeout( () => {
                videoEl.play().then( () => {
                    this.setState({ imageOpacity: 0 });
                });
            }, 1000);
        }
    }

    pauseVideo() {
        const videoEl = this.videoPlayer.current;
        
        if ( !videoEl.paused ) {
            setTimeout( () => {
                videoEl.pause();
                this.setState({ imageOpacity: 1 });
            }, 1000);
        }
    }
    
    toggleMyList() {
        const { show, mylistIds, currentUserId } = this.props;
        
        if ( mylistIds.includes(show.id) && this.state.mylistState === 'My List' ) {
            this.setState({ mylistState: 'Removing...'});

            this.props.removeMyListVideo(currentUserId, show.id)
                .then( () => this.setState({ mylistState: 'My List' }));
        } else if ( !mylistIds.includes(show.id) && this.state.mylistState === 'My List' ) {
            this.setState({ mylistState: 'Adding...'});

            this.props.addMyListVideo(currentUserId, show.id)
                .then( () => this.setState({ mylistState: 'My List'}));
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
        const { show, video, mylistIds } = this.props;
        const { imageOpacity, started, ended, mylistState } = this.state;
        
        const buttonIcon = this.videoPlayer.current ? this.videoControllerIcon() : null;
        const buttonFunc = this.videoPlayer.current ? this.videoFunction() : null;
        const iconStyle = started ? { opacity: 1 } : { opacity: 0 };
        const myListIcon = mylistIds.includes(show.id) ? <i className="fas fa-check"></i> : <i className="fas fa-plus"></i>;

        let imageAnimation = '';
        let blackAnimation = '';
        if ( started && imageOpacity === 0 ) {
            imageAnimation = 'fade-out';
            blackAnimation = 'fade-out-black';
        } else if ( started && imageOpacity === 1 ) {
            imageAnimation = 'fade-in';
            blackAnimation = 'fade-in-black';
        } else if ( ended ) {
            imageAnimation = 'fade-in';
            blackAnimation = 'fade-in-black';
        }

        return (
            <figure className="big-video-preview-wrapper" ref={this.entirePreview}>
                <figure className="big-preview-filter"></figure>
                <section className="big-video-poster" >
                    <img src={show && show.posterUrl ? show.posterUrl : window.tempBgURL} 
                        className={`preview-poster ${imageAnimation}`}
                        ref={this.poster}
                    ></img>
                    <figure className={`poster-black-bg ${blackAnimation}`}></figure>
                </section>

                <section className="video-el-wrapper" >
                    <figure className="big-preview-filter"></figure>
                    <figure className="big-video-bg"></figure>
                    <video  controls={true}
                            muted
                            className="big-video"
                            ref={this.videoPlayer}
                            onCanPlayThrough={this.videoReady}
                            onEnded={this.videoEnded}
                    >
                        { video && video.videoUrl ? <source src={video.videoUrl} type="video/mp4" /> : null }
                    </video>
                </section>

                <article className="big-preview-left-controls">
                    <article className="big-preview-show-title">
                        <h3><strong>Hu'sflix</strong> Original</h3>
                        <article className="title-wrapper">
                            <h1>{show.title}</h1>
                        </article>
                    </article>

                    <div className="big-preview-play-mylist-btns">
                        <button className="big-preview-play" onClick={this.launchWatch}><i className="fas fa-play"></i> Play</button>
                        <button className="big-preview-myList" onClick={this.toggleMyList}>{myListIcon} {mylistState}</button>
                    </div>

                    <p className={`big-preview-show-tagline ${imageAnimation}`}>
                        {show.tagline}
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