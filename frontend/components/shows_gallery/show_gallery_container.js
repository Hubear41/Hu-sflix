import { connect } from 'react-redux';
import { fetchShows } from '../../actions/show_actions';
import { stopLoading, startLoading } from '../../actions/ui_actions'
import ShowGallery from './show_gallery';

const msp = ({ entities, ui, session }) => {
    const shows = Object.values(entities.shows);
    const videos = entities.videos;
    const genres = entities.genres;
    const loading = ui.loading;
    const currentUserId = session.id;
    const mylistShowIds = entities.users[currentUserId].listShowIds || [];

    return {
        shows,
        videos,
        genres,
        loading,
        currentUserId,
        mylistShowIds,
        galleryType: 'WITH_BANNER'
    }
};

const mdp = dispatch => ({
    requestAllShows: () => dispatch(fetchShows()),
    stopLoading: () => dispatch(stopLoading()),
    startLoading: () => dispatch(startLoading()),
    
});

export default connect(msp, mdp)(ShowGallery);