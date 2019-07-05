import { connect } from 'react-redux';
import { fetchGenreShows } from '../../actions/genre_actions';
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

const msp = (state, ownProps) => {
    const genreId = ownProps.match.params.genreId;
    const genre = state.entities.genres[genreId];
    const shows = genre !== undefined ? findShowsByGenre(state.entities.shows, genre) : [];
    
    return {
        shows,
        genreId,
        genres: state.entities.genres,
        videos: state.entities.videos,
    }
}

const mdp = dispatch => ({
    requestAllShows: id => dispatch(fetchGenreShows(id)),
})

export default withRouter(connect(msp, mdp)(ShowGallery));
