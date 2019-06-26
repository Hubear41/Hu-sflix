import { connect } from 'react-redux';
import { fetchShows } from '../../actions/show_actions';
import { fetchGenres } from '../../actions/genre_actions';
import ShowGallery from './show_gallery';

const msp = ({entities}) => {
    const shows = Object.values(entities.shows);
    const videos = entities.videos;
    const genres = entities.genres;

    return {
        shows,
        videos,
        genres,
        galleryType: 'showsIndex',
    }
};

const mdp = dispatch => ({
    // requestAllGenres: () => dispatch(fetchGenres()),
    requestAllShows: () => dispatch(fetchShows()),
});

export default connect(msp, mdp)(ShowGallery);