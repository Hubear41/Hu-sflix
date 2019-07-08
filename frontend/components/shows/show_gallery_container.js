import { connect } from 'react-redux';
import { fetchShows } from '../../actions/show_actions';
import { stopLoading } from '../../actions/ui_actions'
import ShowGallery from './show_gallery';

const msp = ({ entities, ui }) => {
    const shows = Object.values(entities.shows);
    const videos = entities.videos;
    const genres = entities.genres;
    const loading = ui.loading;

    return {
        shows,
        videos,
        genres,
        loading,
        galleryType: 'Banner-Titles'
    }
};

const mdp = dispatch => ({
    requestAllShows: () => dispatch(fetchShows()),
    stopLoading: () => dispatch(stopLoading()),
});

export default connect(msp, mdp)(ShowGallery);