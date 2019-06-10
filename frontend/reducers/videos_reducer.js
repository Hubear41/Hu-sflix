import {
    RECEIVE_VIDEO,
    RECEIVE_SHOWS,
    RECEIVE_SHOW,
} from '../actions/show_actions';
import { merge } from 'lodash';

const videosReducer = (state = {}, { type, video, videos }) => {
    Object.freeze(state);

    switch( type ) {
        case RECEIVE_VIDEO:            
            return merge({}, state, { [video.id]: video });
        case RECEIVE_SHOW: 
            return merge({}, state, { [video.id]: video });
        case RECEIVE_SHOWS:
            return videos;
        default: 
            return state;
    }
};

export default videosReducer;