import {
    RECEIVE_VIDEO
} from '../actions/show_actions';
import { merge } from 'lodash';

const videosReducer = (state = {}, action) => {
    Object.freeze(state);

    switch( action.type ) {
        case RECEIVE_VIDEO:
            const { video } = action;
            
            return merge({}, state, { [video.id]: video });
        default: 
            return state;
    }
};

export default videosReducer;