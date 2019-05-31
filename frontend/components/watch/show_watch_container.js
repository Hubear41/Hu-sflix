import { connect } from 'react-redux';
import { fetchVideo } from '../../actions/show_actions';
import { withRouter } from 'react-router-dom'
import Watch from './show_watch';

const msp = (state, ownProps) => {
    const video = state.entities.videos[ownProps.match.params.videoId]

    return {
        video,
    }
}

const mdp = dispatch => ({
    fetchVideo: id => dispatch(fetchVideo(id)),
});


export default withRouter(connect(msp, mdp)(Watch))