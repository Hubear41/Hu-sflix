import { connect } from 'react-redux';
import { fetchShows, fetchShow, fetchVideo } from '../../actions/show_actions';
import ShowGallery from './show_gallery';

const msp = ({entities}) => ({
    shows: Object.values(entities.shows),
});


const mdp = dispatch => ({
    requestAllShows: () => dispatch(fetchShows()),
    requestShow: id => dispatch(fetchShow(id)),
    requestVideo: id => dispatch(fetchVideo(id)),
});

export default connect(msp, mdp)(ShowGallery);