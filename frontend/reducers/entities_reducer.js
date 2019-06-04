import { combineReducers } from 'redux';
import users from './users_reducer';
import videos from './videos_reducer';
import shows from './shows_reducer';
import genres from './genre_reducer';

const entitiesReducer = combineReducers({
    users,
    videos,
    shows,
    genres,
});

export default entitiesReducer;