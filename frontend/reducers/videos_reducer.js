import {
    RECEIVE_VIDEO,
    RECEIVE_VIDEOS,
    RECEIVE_SHOW,
} from '../actions/show_actions';
import { merge } from 'lodash';

const videosReducer = (state = {}, {video, type, videos}) => {
    Object.freeze(state);

    switch( type ) {
        case RECEIVE_VIDEOS:
            return videos;
        case RECEIVE_SHOW:
            return merge({}, state, { [video.id]: video });
        case RECEIVE_VIDEO:
            return merge({}, state, { [video.id]: video });
        default: 
            return state;
    }
};

export default videosReducer;