import {
    RECEIVE_VIDEO,
    RECEIVE_SHOWS,
} from '../actions/show_actions';
import { merge } from 'lodash';

const videosReducer = (state = {}, action) => {
    Object.freeze(state);

    switch( action.type ) {
        case RECEIVE_VIDEO:
            const { video } = action;
            
            return merge({}, state, { [video.id]: video });
        case RECEIVE_SHOWS:
            return action.videos;
        default: 
            return state;
    }
};

export default videosReducer;