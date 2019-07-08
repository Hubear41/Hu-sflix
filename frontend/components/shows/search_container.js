import { connect } from 'react-redux'
import { searchShows } from '../../actions/show_actions';
import { stopLoading, startLoading } from '../../actions/ui_actions';
import ShowGallery from './show_gallery'

const msp = ({ entities, ui }, ownProps) => {
    const shows = Object.values(entities.shows)
    const videos = entities.videos;
    const genres = entities.genres;
    const query = new URLSearchParams(ownProps.location.search).get('q');
    const loading = ui.loading;

    return {
        shows,
        videos,
        genres,
        query,
        loading,
        galleryType: 'SEARCH',
    }
}

const mdp = dispatch => ({
    search: query => dispatch(searchShows(query)),
    stopLoading: () => dispatch(stopLoading()),
    startLoading: () => dispatch(startLoading()),
});

export default connect(msp, mdp)(ShowGallery);