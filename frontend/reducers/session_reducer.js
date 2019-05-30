import {
    LOGOUT_USER,
    LOGIN_USER,
} from '../actions/session_actions';
// import merge from 'lodash';

const _nullSession = {
    id: null
};

const sessionReducer = (state = _nullSession, action) => {
    Object.freeze(state);
    switch(action.type) {
        case LOGIN_USER:
            return Object.assign({}, state, { id: action.currentUser.id});
        case LOGOUT_USER:
            return _nullSession;
        default:
            return state;
    }
};

export default sessionReducer;