import { connect } from 'react-redux';
import { fetchVideo } from '../../actions/show_actions';
import BigPreview from './banner_video';

const msp = (state, ownProps) => {
    const { show } = ownProps;

    const previewId = show.show_type === 'FEATURE' ? show.movie_id : show.episode_ids[0];
    const previewVideo = state.entities.videos[previewId] || null;
    const isPreviewing = state.ui.preview; 
    
    return {
        video: previewVideo,
        previewId,
        isPreviewing,
    };
};

const mdp = dispatch => ({
    requestVideo: id => dispatch(fetchVideo(id)),
});

export default connect(msp, mdp)(BigPreview);