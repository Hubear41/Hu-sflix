import {
    RECEIVE_GENRE,
    RECEIVE_GENRES,
    RECEIVE_GENRE_SHOWS,
} from '../actions/genre_actions';
import { RECEIVE_SHOWS } from '../actions/show_actions';
import { merge } from 'lodash';

const genreReducer = (state ={}, action) => {
    Object.freeze(state);

    switch( action.type ) {
        case RECEIVE_GENRES:
            return action.genres;
        case RECEIVE_GENRE:
            const { genre } = action;
        
            return merge({}, state, { [genre.id]: genre });
        case RECEIVE_GENRE_SHOWS:
            return action.genres;
        case RECEIVE_SHOWS:
            return action.genres;
        default:
            return state;
    }
}

export default genreReducer;