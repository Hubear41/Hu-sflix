import { connect } from 'react-redux';
import { receiveNoPreview, receivePreview } from '../../actions/ui_actions';
import PreviewPlayerSmall from './show_preview_player_small';

const mdp = dispatch => ({
    startPreview: () => dispatch(receivePreview()),
    endPreview: () => dispatch(receiveNoPreview()),
});

export default connect(null, mdp)(PreviewPlayerSmall);