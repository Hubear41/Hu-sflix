import { connect } from 'react-redux';
import { fetchGenres } from '../../actions/genre_actions';
import GenreGallery from './genre_gallery';

const msp = state => ({
    genres: state.entities.genres,
    genreType: 'Movies',
})

const mdp = dispatch => ({
    fetchGenres: id => dispatch(fetchGenres()),
})

export default connect(msp, mdp)(GenreGallery);