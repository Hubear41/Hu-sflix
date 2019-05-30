import { LOGIN_USER } from '../actions/session_actions';
import { merge } from 'lodash';

const usersReducer = (state = {}, action) => {
    Object.freeze(state);
    switch(action.type) {
        case LOGIN_USER:
            const { currentUser } = action;
            debugger
            return merge({}, state, { [currentUser.id]: currentUser });
        default: 
            return state;
    }
};

export default usersReducer;