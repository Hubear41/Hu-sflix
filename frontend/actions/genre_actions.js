import { fetchGenre } from '../util/genre_util'

export const fetchGenre = id => dispatch => (
    fetchGenre(id).then( genre => receiveGenre(genre) )
);

const receiveGenre = genre => ({
    type: RECEIVE_GENRE,
    genre
});