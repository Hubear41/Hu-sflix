import { connect } from 'react-redux';
import { fetchShow, fetchShows } from '../../actions/show_actions';
import { withRouter } from 'react-router-dom'
import Watch from './show_watch';

const msp = (state, ownProps) => {
    const video = state.entities.videos[ownProps.match.params.videoId];
    const show = state.entities.shows[ownProps.match.params.showId];
    const nextShow = show ? state.entities.shows[show.nextShowId] : null;

    return {
        video,
        show,
        nextShow,
    }
}

const mdp = dispatch => ({
    fetchShow: showId => dispatch(fetchShow(showId)),
    fetchShows: () => dispatch(fetchShows()),
});


export default withRouter(connect(msp, mdp)(Watch))