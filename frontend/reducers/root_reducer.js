import React from 'react';
import { combineReducers } from 'redux';
import session from './session_reducer';
import errors from './errors_reducer';
import entitites from './entities_reducer';

const RootReducer = combineReducers({
    // entitites,
    session,
    errors,
});

export default RootReducer;