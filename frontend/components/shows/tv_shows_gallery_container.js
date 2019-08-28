import { connect } from 'react-redux';
import { stopLoading, startLoading } from '../../actions/ui_actions';
import { fetchTVShows } from '../../actions/show_actions';
import ShowGallery from './show_gallery';

const msp = ({ entities, ui, session }) => {
    const shows = Object.values(entities.shows);
    const videos = entities.videos;
    const genres = entities.genres;
    const loading = ui.loading;
    const currentUserId = session.id;
    const mylistShowIds = entities.users[currentUserId].listShowIds;

    return {
        shows,
        videos,
        genres,
        loading,
        currentUserId,
        mylistShowIds,
        galleryType: 'WITH_BANNER',
    }
}

const mdp = dispatch => ({
    stopLoading: () => dispatch(stopLoading()),
    startLoading: () => dispatch(startLoading()),
    requestAllShows: () => dispatch(fetchTVShows()),
})

export default connect(msp, mdp)(ShowGallery);