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
            myListState: this.props.listShowIds.includes(this.props.show.id) ? "REMOVE FROM MY LIST" : "ADD TO MY LIST"
        };

        this.videoPlayer = React.createRef();
        this.wrapper = React.createRef();
        this.videoTimeout;
        this.launchWatch = this.launchWatch.bind(this);
        this.toggleMute = this.toggleMute.bind(this);
        this.playVideo = this.playVideo.bind(this);
        this.pauseVideo = this.pauseVideo.bind(this);
        this.toggleMyList = this.toggleMyList.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;

        const height = 160;
        this.setState({ height });
    }

    componentWillUnmount() {
        this._isMounted = false;

        clearTimeout(this.videoTimeout);
        clearTimeout(this.timeout);
    }
    
    launchWatch() {
        const { show } = this.props;
        const videoEl = this.videoPlayer.current;

        videoEl.pause();
        clearTimeout(this.videoTimeout);
        
        if (show.type === 'Movie') {
            this.props.history.push({
                pathname: `/watch/${show.id}`,
                search: `trackId=${show.film_id}`
            });
        } else {    
            this.props.history.push({
                pathname: `/watch/${show.id}`, 
                search: `trackId=${show.episode_ids[0]}`
            });    
        }
    }

    toggleMute(e) {
        const videoEl = this.videoPlayer.current;

        if ( videoEl.muted ) {
            videoEl.muted = false;
            if (this._isMounted) this.setState({ muted: false });
        } else {
            videoEl.muted = true;
            if (this._isMounted) this.setState({ muted: true });
        }
    }

    playVideo() {
        if ( this.videoPlayer.current === null || this.state.paused === false ) {
            return;
        }

        const videoEl = this.videoPlayer.current;
        this.videoTimeout = setTimeout( () => {
            videoEl.play().then( () => {
                if (this._isMounted) {
                    this.props.startPreview();
                    this.setState({ paused: false });
                }
            });
        }, 1000);

        this.timeout = setTimeout( () => {
            this.props.startPreview();
        }, 500);
    }

    pauseVideo() {
        if (this.videoPlayer.current === null || this.state.paused ) {
            return;
        }

        const videoEl = this.videoPlayer.current;
        const wrapperEl = this.wrapper.current;
        wrapperEl.classList.add("out");     

        videoEl.pause();
        this.props.endPreview();
        
        clearTimeout(this.videoTimeout);
        clearTimeout(this.timeout);
        if (this._isMounted) this.setState({ paused: true });
    }

    toggleMyList() {
        const { listShowIds, currentUserId, show } = this.props;
        const { myListState } = this.state;

        if ( listShowIds.includes(show.id) && myListState === 'REMOVE FROM MY LIST') {
            if (this._isMounted) {
                this.setState({ myListState: 'REMOVING...'});
    
                this.props.removeMyListVideo(currentUserId, show.id)
                    .then( () => {
                        if (this._isMounted) this.setState({ myListState: 'ADD TO MY LIST'});
                    });
            }
        } else if ( !listShowIds.includes(show.id) && myListState === 'ADD TO MY LIST') {
            if (this._isMounted) {
                this.setState({ myListState: 'ADDING...' });
    
                this.props.addMyListVideo(currentUserId, show.id)
                    .then( () => {
                        if (this._isMounted) this.setState({ myListState: 'REMOVE FROM MY LIST'});
                    });
            }
        }
    }
    
    render() {
        const { show, preview, genres, listShowIds, myListState } = this.props;
        const genresToShow = [];
        const muteBtn = this.state.muted ? <i className="fas fa-volume-mute button-symbol"></i> : <i className="fas fa-volume-up button-symbol"></i>
        const myListIcon = listShowIds.includes(show.id) ? <i className="fas fa-check button-symbol"></i> : <i className="fas fa-plus button-symbol"></i>;

        if ( show !== undefined && genres.length >= 1) {
            genres.forEach( (genre, idx) => {
                if ( genre === undefined ) {
                    return;
                }

                if ( genre.name !== 'TV Show' && genre.name !== 'Movie' && genre.name !== 'Recently Added' && genresToShow.length < 3 ) {
                    if ( genresToShow.length === 2 ) {
                        genresToShow.push(<span className='genre-title'key={genre.name + genre.id}>{genre.name}</span>);
                    } else {
                        genresToShow.push(<span className='genre-title' key={genre.name + genre.id}>{genre.name}</span>);
                        genresToShow.push(<strong className='genre-bullet' key={'bullet ' + idx}>  {'\u2022'}  </strong>);
                    }
                }
            });
        }

        return (
            <>
                <section id="show-peek-preview-wrapper" 
                         className={`show-row-item-${show.id}`} 
                         ref={this.wrapper}
                         onMouseEnter={this.playVideo}
                         onMouseLeave={this.pauseVideo}
                >
                    <img className="show-title-card" 
                         src={show ? show.posterUrl : window.tempBgURL} 
                         alt={show.title} 
                         onClick={this.launchWatch}
                         onMouseEnter={this.playVideo}
                    ></img>

                    <figure className="show-peek-preview-player preview-fade-in" onMouseLeave={this.pauseVideo}>
                        <figure className="preview-video-player preview-fade-in">
                            <figure className='preview-clickable-area' onClick={this.launchWatch}></figure>
                            <video id={`show-${show.id} preview-video`} 
                                   ref={this.videoPlayer}
                                   onClick={this.launchWatch}
                                   muted='muted'
                            >
                                <source src={preview ? preview.videoUrl : '' } type="video/mp4"/> 
                            </video>
                        </figure>

                        <aside className="preview-player-right-side-btns preview-fade-in">
                            <button className="preview-mute-btn right-side-btn preview-fade-in" onClick={this.toggleMute} >
                                {muteBtn}
                                <i className="fas fa-circle preview-btn-bg"></i>
                                <i className="far fa-circle preview-btn-outline"></i>
                            </button>
                            <div className='right-side-placeholders right-side-btn'></div>
                            <div className='right-side-placeholders right-side-btn'></div>
                            <button onClick={this.toggleMyList} className='preview-mylist-btn right-side-btn preview-fade-in'>
                                {myListIcon}
                                <i className="fas fa-circle preview-btn-bg"></i>
                                <i className="far fa-circle preview-btn-outline"></i>
                                {/* <span className='mylist-popup-desc preview-fade-in'>{myListState}</span> */}
                            </button>
                        </aside>

                        <figcaption className="preview-video-info-desc preview-fade-in" onClick={this.launchWatch}>
                            <button className="preview-play-btn preview-fade-in">
                                <i className="fas fa-play play-btn-triangle"></i>
                                <i className="fas fa-circle play-btn-bg"></i>
                                <i className="far fa-circle play-btn-outline"></i>
                            </button>

                            <h5 className="preview-show-title preview-fade-in">{show.title}</h5>

                            <article className='preview-details preview-fade-in'>
                                <span className="show-maturity-rating">{show.maturity_rating}</span>
                                <span>{DateTimeUTIL.secondsToHoursMinutes(show.runtime)}</span>
                            </article>

                            <article className='preview-genres preview-fade-in'>
                                {genresToShow}
                            </article>
                        </figcaption>
                        
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