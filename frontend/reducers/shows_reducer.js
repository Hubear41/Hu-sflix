import {
    RECEIVE_SHOW,
    RECEIVE_SHOWS
} from '../actions/show_actions';
import { RECEIVE_GENRE_SHOWS } from '../actions/genre_actions';
import { merge } from 'lodash';

const showsReducer = (state = {}, { type, show, shows }) => {
    Object.freeze(state);
    
    switch( type ) {
        case RECEIVE_SHOWS:
            return shows;
        case RECEIVE_SHOW:
            return merge({}, state, { [show.id]: show });
        case RECEIVE_GENRE_SHOWS:
            return shows;
        default:
            return state;
    }
};

export default showsReducer;