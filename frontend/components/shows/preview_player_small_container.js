import { connect } from 'react-redux';
import { receiveNoPreview, receivePreview } from '../../actions/ui_actions';
import { addMyListVideo, removeMyListVideo } from '../../actions/my_list_actions';
import PreviewPlayerSmall from './show_preview_player_small';

const msp = ({ entities, session}) => {
    const currentUserId = session.id;
    const listShowIds = entities.users[currentUserId].listShowIds || [];

    return {
        currentUserId,
        listShowIds,
    }
}

const mdp = dispatch => ({
    startPreview: () => dispatch(receivePreview()),
    endPreview: () => dispatch(receiveNoPreview()),
    addMyListVideo: (userId, showId) => dispatch(addMyListVideo(userId, showId)),
    removeMyListVideo: (userId, showId) => dispatch(removeMyListVideo(userId, showId)),
});

export default connect(msp, mdp)(PreviewPlayerSmall);