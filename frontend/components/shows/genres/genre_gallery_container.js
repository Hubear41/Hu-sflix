import { connect } from 'react-redux';
import { fetchGenres } from '../../../actions/genre_actions';
import { withRouter } from 'react-router-dom';
import ShowGallery from '../show_gallery';

const msp = (state, ownProps) => {
    const genre = state.entities.genres[ownProps.match.params.genreId];
    const shows = findShowsByGenre(state.entities.shows, genre);
    
    return {
        shows,
        genres: state.entities.genres,
        galleryType: 'GenreGallery'
    }
}

const mdp = dispatch => ({
    fetchGenres: () => dispatch(fetchGenres()),
})

export default withRouter(connect(msp, mdp)(ShowGallery));

const findShowsByGenre = (shows, genre) => {
    const showsByGenre = [];
    
    genre.shows_with_genre_ids.map( showId => {
        showsByGenre.push( shows[showId] );
    });

    return showsByGenre;
}