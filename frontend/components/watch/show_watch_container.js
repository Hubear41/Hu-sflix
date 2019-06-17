import { connect } from 'react-redux';
import { fetchVideo, fetchShow } from '../../actions/show_actions';
import { withRouter } from 'react-router-dom'
import Watch from './show_watch';

const msp = (state, ownProps) => {
    const video = state.entities.videos[ownProps.match.params.videoId];
    const show = state.entities.shows[ownProps.match.params.showId];
    // let nextShow = null;

    // const shows = Object.values(state.entities.shows);
    // if ( shows.length > 1 ) {
    //     shows.each( otherShow => {
    //         if ( otherShow.id !== show.id ) {
    //             nextShow = otherShow;
    //         }
    //     });  
    // }

    return {
        video,
        show,
        // nextShow,
    }
}

const mdp = dispatch => ({
    fetchVideo: videoId => dispatch(fetchVideo(videoId)),
    fetchShow: showId => dispatch(fetchShow(showId)),
});


export default withRouter(connect(msp, mdp)(Watch))