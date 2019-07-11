import { connect } from 'react-redux';
import { fetchVideo, fetchShow } from '../../actions/show_actions';
import { removeMyListVideo} from '../../actions/my_list_actions';
import { withRouter } from 'react-router-dom';
import Watch from './show_watch';

const msp = ({ entities, session }, ownProps) => {
    const videoId = new URLSearchParams(ownProps.location.search).get("trackId");
    const video = entities.videos[videoId];
    const show = entities.shows[ownProps.match.params.showId];
    const currentUserId = session.id;

    return {
        video,
        show,
        currentUserId,
    }
}

const mdp = dispatch => ({
    fetchVideo: videoId => dispatch(fetchVideo(videoId)),
    fetchShow: showId => dispatch(fetchShow(showId)),
    removeMyListVideo: (userId, showId) => dispatch(removeMyListVideo(userId, showId))
});


export default withRouter(connect(msp, mdp)(Watch))