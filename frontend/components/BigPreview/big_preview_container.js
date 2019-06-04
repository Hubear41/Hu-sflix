import { connect } from 'react-redux';
import { fetchVideo } from '../../actions/show_actions';
import BigPreview from './big_preview';

const msp = (state, ownProps) => {
    const { show } = ownProps;
    
    const previewVideo = show ? state.entities.videos[show.preview_id] : null;
    return {
        video: previewVideo,
    };
};

const mdp = dispatch => ({
    requestVideo: id => dispatch(fetchVideo()),
});

export default connect(msp, mdp)(BigPreview);