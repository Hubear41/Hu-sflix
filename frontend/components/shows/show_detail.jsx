import React from 'react';

class ShowDetail extends React.Component {
    constructor(props) {
        super(props);
        this.dropdownPlayer = React.createRef();
    }

    continue_playing() {
        const videoEl = this.dropdownPlayer.current;
        const { currentTime } = this.props;

        videoEl.muted = false;
        videoEl.currentTime = currentTime;
        videoEl.play();
    }

    launch_watch() {
        const { show } = this.props;
        const videoEl = this.dropdownPlayer.current;

        videoEl.pause();

        if (show.show_type === 'Movie') {
            this.props.history.push(`/watch/${show.id}/${show.movie_id}`)
        } else {
            this.props.history.push(`/watch/${show.id}/${show.episode_ids[0]}`)
        }
    }

    closeDropdown() {
        this.props.closeDropdown();
    }

    componentDidMount() {
        this.props.getShowInfo(this.props.match.params.showId);
    }

    render() {
        const { rowNum, show } = this.props;
        let muteBtnIcon = null;
        let dropdownVisibility = 'hidden-dropdown';

        if ( this.dropdownPlayer.current !== null ) {
            const videoEl = this.dropdownPlayer.current;
            muteBtnIcon = videoEl.muted ? <i className="fas fa-volume-mute"></i> : <i className="fas fa-volume-up"></i>
        }

        return (
            <figure className={`row-preview${rowNum} dropdown-preview-player ${dropdownVisibility}`}>
                <article className='dropdown-details'>
                    <h2>{show.title}</h2>
                    <article className='dropdown-year-ma'>
                        <span>{show.year}</span>
                        <strong className='maturity-box'>{show.maturity_rating}</strong>
                    </article>
                    <p>{show.tagline}</p>
                    <section>
                        <button className='dropdown-play-btn'>Play</button>
                        {/* <button>My List</button> */}
                        {/* <button>Like</button> */}
                    </section>
                    <h6>Director: {show.director}</h6>
                </article>
                <video  id="dropdown-player"
                        ref={this.dropdownPlayer}
                        muted='muted'
                        onCanPlayThrough={this.continue_playing}
                >
                    <source/>
                </video>
                <button className='dropdown-close-btn'>X</button>
                <button className='dropdown-mute-btn'>{muteBtnIcon}</button>
            </figure>
        );
    }
}

export default ShowDetail;