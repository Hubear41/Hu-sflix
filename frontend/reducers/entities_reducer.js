import { combineReducers } from 'redux';
import users from './users_reducer';
import videos from './videos_reducer';
import shows from './shows_reducer';

const entitiesReducer = combineReducers({
    users,
    videos,
    shows,
});

export default entitiesReducer;