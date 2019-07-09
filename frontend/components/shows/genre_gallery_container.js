import { connect } from 'react-redux';
import { fetchGenreShows } from '../../actions/genre_actions';
import { stopLoading, startLoading } from '../../actions/ui_actions';
import { withRouter } from 'react-router-dom';
import ShowGallery from './show_gallery';

const findShowsByGenre = (shows, genre) => {
    const showsByGenre = [];
    genre.shows_with_genre_ids.map( showId => {
        if ( shows[showId] !== undefined ) {
            showsByGenre.push( shows[showId] );
        }
    });
    return showsByGenre;
}

const msp = ({ entities, ui, session }, ownProps) => {
    const genreId = ownProps.match.params.genreId;
    const genre = entities.genres[genreId];
    const shows = genre !== undefined ? findShowsByGenre(entities.shows, genre) : [];
    const loading = ui.loading;
    const mylistVideoIds = entities.users[session.id].list_video_ids;
    
    return {
        shows,
        genres: entities.genres,
        videos: entities.videos,
        genreId,
        loading,
        mylistVideoIds,
    }
}

const mdp = dispatch => ({
    requestAllShows: id => dispatch(fetchGenreShows(id)),
    stopLoading: () => dispatch(stopLoading()),
    startLoading: () => dispatch(startLoading()),
})

export default withRouter(connect(msp, mdp)(ShowGallery));
