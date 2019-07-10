import { connect } from 'react-redux';
import { fetchVideo, fetchShow } from '../../actions/show_actions';
import { addMyListVideo, removeMyListVideo} from '../../actions/my_list_actions';
import { withRouter } from 'react-router-dom';
import Watch from './show_watch';

const msp = ({ entities, session }, ownProps) => {
    const video = entities.videos[ownProps.match.params.videoId];
    const show = entities.shows[ownProps.match.params.showId];
    const currentUserId = session.id;
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
        currentUserId,
        // nextShow,
    }
}

const mdp = dispatch => ({
    fetchVideo: videoId => dispatch(fetchVideo(videoId)),
    fetchShow: showId => dispatch(fetchShow(showId)),
    removeMyListVideo: (userId, showId) => dispatch(removeMyListVideo(userId, showId))
});


export default withRouter(connect(msp, mdp)(Watch))