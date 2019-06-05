import { connect } from 'react-redux';
import { fetchVideo } from '../../actions/show_actions';
import BigPreview from './big_preview';

const msp = (state, ownProps) => {
    const { show } = ownProps;

    const previewId = show.show_type === 'FEATURE' ? show.movie_id : show.episode_ids[0];

    const previewVideo = state.entities.videos[previewId] || null;
    debugger
    return {
        video: previewVideo,
        previewId,
    };
};

const mdp = dispatch => ({
    requestVideo: id => dispatch(fetchVideo(id)),
});

export default connect(msp, mdp)(BigPreview);