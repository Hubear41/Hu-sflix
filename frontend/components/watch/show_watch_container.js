import { connect } from 'react-redux';
import { fetchVideo, fetchShow, fetchShows } from '../../actions/show_actions';
import { withRouter } from 'react-router-dom'
import Watch from './show_watch';

const msp = (state, ownProps) => {
    const video = state.entities.videos[ownProps.match.params.videoId];
    const show = state.entities.shows[ownProps.match.params.showId];

    const shows = Object.values(state.entities.shows) 
    let nextShow = null, nextId = 0;
    
    if ( shows.length > 1 ) {
        nextId = Math.floor(Math.random() * shows.length );

        if ( nextId === show.id ) {
            nextId = Math.floor(Math.random() * show.length);
        }
    }

    nextShow = shows[nextId];

    return {
        video,
        show,
        nextShow: nextShow,
    }
}

const mdp = dispatch => ({
    fetchVideo: videoId => dispatch(fetchVideo(videoId)),
    fetchShow: showId => dispatch(fetchShow(showId)),
    fetchShows: () => dispatch(fetchShows()),
});


export default withRouter(connect(msp, mdp)(Watch))