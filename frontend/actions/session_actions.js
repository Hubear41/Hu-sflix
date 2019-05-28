import * as SessionUTIL from '../util/session_api_util';

export const LOGOUT_USER = 'LOGOUT_USER';
export const LOGIN_USER = 'LOGIN_USER';

export const loginUser = user => dispatch => (
    SessionUTIL.loginUser(user).then( user => dispatch(receiveUser(user)) )
);

export const logoutUser = userId => dispatch => (
    SessionUTIL.logoutUser(userId).then( () => dispatch(removeUser()) )
);

export const createUser = user => dispatch => (
    SessionUTIL.createUser(user).then( user => dispatch(receiveUser(user)) )
);

const receiveUser = user => ({
    type: LOGIN_USER,
    user,
});

const removeUser = () => ({
    type: LOGOUT_USER,
});