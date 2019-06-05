import { connect } from 'react-redux';
import { fetchShows, fetchVideo } from '../../actions/show_actions';
import { fetchGenres } from '../../actions/genre_actions';
import ShowGallery from './show_gallery';

const msp = ({entities}) => {
    const shows = Object.values(entities.shows);
    
    return {
        shows,
        galleryType: 'showsIndex',
    }
};

const mdp = dispatch => ({
    requestGenres: () => dispatch(fetchGenres()),
    requestAllShows: () => dispatch(fetchShows()),
    requestVideo: id => dispatch(fetchVideo(id)),
});



export default connect(msp, mdp)(ShowGallery);