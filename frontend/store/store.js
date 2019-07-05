import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from '../reducers/root_reducer';

// const logger = createLogger({
//     predicate: (getState, action) => !conf.production
// });

const configureStore = (preloadedState = {}) => {
    return createStore(rootReducer, preloadedState, applyMiddleware(thunk, logger));
    // return createStore(rootReducer, preloadedState, applyMiddleware(thunk, logger));
};

export default configureStore;