import React from 'react';
import { withRouter } from 'react-router-dom';
import * as DateTimeUTIL from '../../util/date_time_util'

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
        this.videoTimeout;
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
        const videoEl = this.videoPlayer.current;

        videoEl.pause();
        clearTimeout(this.videoTimeout);
        
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
        this.videoTimeout = setTimeout( () => {
            videoEl.play().then( () => {
                this.setState({ paused: false });
            });
        }, 2000);
        
        this.props.startPreview();
    }

    pauseVideo() {
        if (this.videoPlayer.current === null) {
            return null;
        }

        const videoEl = this.videoPlayer.current;

        videoEl.pause();
        clearTimeout(this.videoTimeout);
        this.setState({ paused: true });
        this.props.endPreview();
    }

    // openDropDown(e) {

    // }
    
    render() {
        const { show, preview, genres } = this.props;
        const genresToShow = [];
        const muteBtn = this.state.muted ? <i className="fas fa-volume-mute mute-symbol"></i> : <i className="fas fa-volume-up mute-symbol"></i>
        
        if ( show !== undefined && genres.length >= 1) {
            genres.forEach( (genre, idx) => {
                if ( genre.name !== 'TV Show' && genre.name !== 'Movie' ) {
                    if ( idx === genres.length - 1 ) {
                        genresToShow.push(<span className='genre-title'key={genre.name + genre.id}>{genre.name}</span>);
                    } else {
                        genresToShow.push(<span className='genre-title' key={genre.name + genre.id}>{genre.name}</span>);
                        genresToShow.push(<strong className='genre-bullet' key={'bullet ' + idx}>{'\u2022'}</strong>);
                    }
                }
            });
        }
        
        return (
            <>
                <section id="show-peek-preview-wrapper" 
                         className={`show-row-item-x item-${show.id}`} 
                         onMouseEnter={this.playVideo}
                         onMouseLeave={this.pauseVideo}
                >
                    <img src={show ? show.posterUrl : window.tempBgURL} 
                         alt={show.title} 
                         className="show-title-card" 
                         onClick={this.launchWatch}
                    />

                    <figure className="show-peek-preview-player">
                        <figure className="preview-video-player">
                            <figure className='preview-clickable-area' onClick={this.launchWatch}></figure>
                            <video id={`show-${show.id} preview-video`} 
                                   ref={this.videoPlayer}
                                   muted='muted'
                            >
                                <source src={preview ? preview.videoUrl : '' } type="video/mp4"/> 
                            </video>
                            <button className="preview-play-btn">
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
                                <article className='preview-details'>
                                    <span className="show-maturity-rating">{show.maturity_rating}</span>
                                    <span>{DateTimeUTIL.secondsToHoursMinutes(show.runtime)}</span>
                                </article>
                                <article className='preview-genres'>
                                    {genresToShow}
                                </article>
                            </figcaption>
                        </figure>



                        <button className="toggle-show-detail-btn">
                            <i className="fas fa-chevron-down"></i>
                        </button>
                    </figure>
                </section>
            </>
        );
    }
}

export default withRouter(ShowPreviewPlayerSmall);