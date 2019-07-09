import { LOGIN_USER } from '../actions/session_actions';
import { RECEIVE_MYLIST_INFO } from '../actions/my_list_actions'
import { merge } from 'lodash';

const usersReducer = (state = {}, action) => {
    Object.freeze(state);
    switch(action.type) {
        case LOGIN_USER:
            const { currentUser } = action;
            return merge({}, state, { [currentUser.id]: currentUser });
        case RECEIVE_MYLIST_INFO:
            return merge({}, state, { [user.id]: user });
        default: 
            return state;
    }
};

export default usersReducer;