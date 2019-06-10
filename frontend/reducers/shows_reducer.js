import {
    RECEIVE_SHOW,
    RECEIVE_SHOWS
} from '../actions/show_actions';
import { merge } from 'lodash';

const showsReducer = (state = {}, { type, show, nextShow, shows }) => {
    Object.freeze(state);
    
    switch( type ) {
        case RECEIVE_SHOWS:
            return shows;
        case RECEIVE_SHOW:
            return merge({}, state, { [show.id]: show, [nextShow.id]: nextShow });
        default:
            return state;
    }
};

export default showsReducer;