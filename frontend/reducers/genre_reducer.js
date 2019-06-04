import {
    RECEIVE_GENRE,
    RECEIVE_GENRES
} from '../actions/genre_actions';
import { merge } from 'lodash';

const genreReducer = (state ={}, action) => {
    Object.freeze(state);

    switch( action.type ) {
        case RECEIVE_GENRES:
            return action.genres;
        case RECEIVE_GENRE:
            const { genre } = action;
        
            return merge({}, state, { [genre.id]: genre });
        default:
            return state;
    }
}

export default genreReducer;