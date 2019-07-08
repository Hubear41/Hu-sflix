import {
    PREVIEWING,
    NOT_PREVIEWING,
    START_LOADING,
    STOP_LOADING,
} from '../actions/ui_actions';

const _defaultState = {
    preview: false,
    loading: false,
};

const uiReducer = (state = _defaultState, action) => {
    Object.freeze(state);
    switch( action.type ) {
        case PREVIEWING:
            return Object.assign({}, state, { preview: true });
        case NOT_PREVIEWING:
            return Object.assign({}, state, { preview: false });
        case START_LOADING:
            return Object.assign({}, state, { loading: true });
        case STOP_LOADING:
            return Object.assign({}, state, { loading: false });
        default: 
            return state;
    }
}

export default uiReducer;