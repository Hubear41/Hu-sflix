import { connect } from 'react-redux'
import { searchShows } from '../../actions/show_actions';
import ShowGallery from './show_gallery'

const msp = ({ entities }, ownProps) => {
    const shows = Object.values(entities.shows)
    const videos = entities.videos;
    const genres = entities.genres;
    const query = new URLSearchParams(ownProps.location.search).get('q');

    return {
        shows,
        videos,
        genres,
        query,
        galleryType: 'SEARCH',
    }
}

const mdp = dispatch => ({
    search: query => dispatch(searchShows(query)),
});

export default connect(msp, mdp)(ShowGallery);