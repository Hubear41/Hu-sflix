import React from 'react';
import { withRouter } from 'react-router-dom';
import ShowDetail from './show_detail_container';

class ShowPreviewPlayerSmall extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            height: 0,
            muted: true,
            paused: true,
            focus: true,
        };

        this.videoPlayer = React.createRef();
        this.resetTimeout;
        this.playTimeout;
        this.launchWatch = this.launchWatch.bind(this);
        this.toggleMute = this.toggleMute.bind(this);
        this.playVideo = this.playVideo.bind(this);
        this.pauseVideo = this.pauseVideo.bind(this);
        // this.openDropDown = this.openDropDown.bind(this);
    }

    componentDidMount() {
        const width = document.getElementById("show-peek-preview-wrapper").clientWidth;
        const height = width / 1.5;
        
        this.setState({ height });
    }
    
    launchWatch() {
        const { show } = this.props;
        
        if (show.show_type === 'FEATURE') {
            this.props.history.push(`/watch/${show.id}/${show.movie_id}`)
        } else {    
            this.props.history.push(`/watch/${show.id}/${show.episode_ids[0]}`)    
        }
    }

    toggleMute(e) {
        const videoEl = this.videoPlayer.current;

        if ( videoEl.muted ) {
            videoEl.muted = false;
            this.setState({ muted: false });
        } else {
            videoEl.muted = true;
            this.setState({ muted: true });
        }
    }

    playVideo() {
        if ( this.videoPlayer.current === null ) {
            return null;
        }

        const videoEl = this.videoPlayer.current;
        if ( videoEl.paused ) {
            
            this.playTimeout = setTimeout( () => {
                videoEl.play();
                this.setState({ paused: false });
            }, 1000);
        }
    }

    pauseVideo() {
        if (this.videoPlayer.current === null) {
            return null;
        }

        const videoEl = this.videoPlayer.current;
        if ( !videoEl.paused ) {
            videoEl.pause();
            clearTimeout(this.playTimeout);
            clearTimeout(this.resetTimeout);
            
            this.setState({ paused: true });
            this.resetTimeout = setTimeout( () => {
                videoEl.currentTime = 0;
            }, 5000);
        }
    }

    // openDropDown(e) {

    // }
    
    render() {
        const { show, preview } = this.props;
        const muteBtn = this.state.muted ? <i className="fas fa-volume-mute mute-symbol"></i> : <i className="fas fa-volume-up mute-symbol"></i>
        // debugger
        return (
            <>
                <section id="show-peek-preview-wrapper" 
                         className={`show-row-item-x item-${show.id}`} 
                        //  style={{height: this.state.height}} 
                         onClick={this.launchWatch}
                         onMouseEnter={this.playVideo}
                         onMouseLeave={this.pauseVideo}
                         onMouseOut={this.pauseVideo}
                >
                                
                    <img src={show ? show.posterUrl : window.tempBgURL} alt={show.title} className="show-title-card" />
                    {/* <span className="title-card-name">{show.title}</span> */}

                    <figure className="show-peek-preview-player" 
                            onClick={this.launchWatch}>

                        <figure className="preview-video-player">
                            <video id={`show-${show.id} preview-video`} 
                                   ref={this.videoPlayer}>
                                <source src={preview.videoUrl} type="video/mp4"/> 
                            </video>
                           
                            <button onClick={this.clickPlay} className="preview-play-btn">
                                <figure className="play-btn-icon">
                                    <i className="fas fa-play play-btn-triangle"></i>
                                    <i className="fas fa-circle play-btn-bg"></i>
                                    <i className="far fa-circle play-btn-outline"></i>
                                </figure>
                            </button>

                            <aside className="preview-player-right-side-btns">
                                <button onClick={this.toggleMute} className="preview-mute-btn">
                                    {muteBtn}
                                    <i className="fas fa-circle mute-btn-bg"></i>
                                    <i className="far fa-circle mute-btn-outline"></i>
                                </button>

                            </aside>
 
                            <figcaption className="preview-video-info-desc">
                                <h5 className="preview-show-title">{show.title}</h5>
                                <span className="show-maturity-rating">{show.maturity_rating}</span>
                            </figcaption>
                        </figure>



                        <button className="toggle-show-detail-btn">
                            <i className="fas fa-chevron-down"></i>
                        </button>
                    </figure>

                    {/* <aside className={`show-row-jaw gallery-jaw-${show.id} hidden`}>
                        <ShowDetail key={show.id} rowNum={rowNum} show={show} />
                    </aside> */}
                </section>
            </>
        );
    }
}

export default withRouter(ShowPreviewPlayerSmall);