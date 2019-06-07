import {
    RECEIVE_VIDEO,
    RECEIVE_VIDEOS,
    RECEIVE_SHOW,
} from '../actions/show_actions';
import { merge } from 'lodash';

const videosReducer = (state = {}, action) => {
    Object.freeze(state);

    switch( action.type ) {
        case RECEIVE_VIDEOS:
            return action.videos;
        case RECEIVE_SHOW:
            const { video } = action;

            return merge({}, state, { [video.id]: video });
        case RECEIVE_VIDEO:
            const { video } = action;
            
            return merge({}, state, { [video.id]: video });
        default: 
            return state;
    }
};

export default videosReducer;