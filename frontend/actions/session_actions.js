import * as SessionUTIL from '../util/session_api_util';

export const LOGOUT_USER = 'LOGOUT_USER';
export const LOGIN_USER = 'LOGIN_USER';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';

export const loginUser = user => dispatch => (
    SessionUTIL.loginUser(user).then( 
        user => dispatch(receiveUser(user)),
        errors => dispatch(receiveErrors(errors))
    )
);

export const logoutUser = () => dispatch => (
    SessionUTIL.logoutUser().then( 
        () => dispatch(removeUser()),
        errors => dispatch(receiveErrors(errors)) 
    )
);

export const createUser = user => dispatch => (
    SessionUTIL.createUser(user).then( 
        user => dispatch(receiveUser(user)),
        errors => dispatch(receiveErrors(errors)) 
    )
);

const receiveUser = user => ({
    type: LOGIN_USER,
    currentuUser: user,
});

const removeUser = () => ({
    type: LOGOUT_USER,
});

const receiveErrors = errors => ({
    type: RECIEVE_SESSION_ERRORS,
    errors,
});