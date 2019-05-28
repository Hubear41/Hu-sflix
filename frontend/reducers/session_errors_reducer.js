import { RECEIVE_SESSION_ERRORS } from '../actions/session_actions';
import { type } from 'os';

const sessionErrorsReducer = (state = {}, action) => {
    Object.freeze(state);

    switch(action.type) {
        case RECEIVE_SESSION_ERRORS:
            return action.errors;
        default:
            return state;
    }
};

export default sessionErrorsReducer;