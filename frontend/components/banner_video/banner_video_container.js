import { connect } from 'react-redux';
import { fetchVideo } from '../../actions/show_actions';
import { addMyListVideo, removeMyListVideo } from '../../actions/my_list_actions'
import BigPreview from './banner_video';

const msp = ({ entities, session, ui }, ownProps) => {
    const { show } = ownProps;

    const previewId = show.show_type === 'FEATURE' ? show.movie_id : show.episode_ids[0];
    const previewVideo = entities.videos[previewId] || null;
    const isPreviewing = ui.preview; 
    const currentUserId = session.id;
    const mylistIds = entities.users[currentUserId].listShowIds || [];
    
    return {
        video: previewVideo,
        previewId,
        isPreviewing,
        mylistIds,
        currentUserId,
    };
};

const mdp = dispatch => ({
    requestVideo: id => dispatch(fetchVideo(id)),
    addMyListVideo: (userId, showId) => dispatch(addMyListVideo(userId, showId)),
    removeMyListVideo: (userId, showId) => dispatch(removeMyListVideo(userId, showId)),
});

export default connect(msp, mdp)(BigPreview);