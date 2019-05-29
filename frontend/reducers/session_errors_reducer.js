import { RECEIVE_SESSION_ERRORS, LOGIN_USER } from '../actions/session_actions';
import { CLEAR_ERRORS } from '../actions/errors_actions';

const sessionErrorsReducer = (state = [], action) => {
    Object.freeze(state);

    switch(action.type) {
        case RECEIVE_SESSION_ERRORS:
            return action.errors.responseJSON;
        case LOGIN_USER:
            return [];
        case CLEAR_ERRORS:
            return [];
        default:
            return state;
    }
};

export default sessionErrorsReducer;