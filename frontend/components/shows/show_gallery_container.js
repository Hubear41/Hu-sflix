import { connect } from 'react-redux';
import { fetchShows, fetchPreviewVideos } from '../../actions/show_actions';
import { fetchGenres } from '../../actions/genre_actions';
import ShowGallery from './show_gallery';

const msp = ({entities}) => {
    const shows = Object.values(entities.shows);
    const videos = entities.videos;

    return {
        shows,
        videos,
        galleryType: 'showsIndex',
    }
};

const mdp = dispatch => ({
    // requestAllGenres: () => dispatch(fetchGenres()),
    requestAllShows: () => dispatch(fetchShows()),
    requestPreviewVideos: () => dispatch(fetchPreviewVideos()),
});

export default connect(msp, mdp)(ShowGallery);