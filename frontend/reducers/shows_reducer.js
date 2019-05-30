import {
    RECEIVE_SHOW,
    RECEIVE_SHOWS
} from '../actions/show_actions';
import { merge } from 'lodash';

const showsReducer = (state = {}, action) => {
    Object.freeze(state);
    
    switch( action.type ) {
        case RECEIVE_SHOWS:
            return action.shows;
        case RECEIVE_SHOW:
            const { show } = action;
            
            return merge({}, state, { [show.id]: show });
        default:
            return state;
    }
};

export default showsReducer;