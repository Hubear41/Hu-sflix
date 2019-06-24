import {
    PREVIEWING,
    NOT_PREVIEWING
} from '../actions/ui_actions';

const uiReducer = (state = { preview: false }, action) => {
    Object.freeze(state);

    switch( action.type ) {
        case NOT_PREVIEWING:
            return { preview: false };
        case PREVIEWING:
            return { preview: true };
        default: 
            return state;
    }
}

export default uiReducer;