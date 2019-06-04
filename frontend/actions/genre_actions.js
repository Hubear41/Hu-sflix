import * as GenreUTIL from '../util/genre_util'

export const RECEIVE_GENRE = 'RECEIVE_GENRE';
export const RECEIVE_GENRES = 'RECEIVE_GENRES';

export const fetchGenre = id => dispatch => (
    GenreUTIL.fetchGenre(id).then( genre => dispatch(receiveGenre(genre)) )
);

export const fetchGenres = () => dispatch => (
    GenreUTIL.fetchGenres().then( genres => dispatch(receiveGenres(genres)))
);

const receiveGenre = genre => ({
    type: RECEIVE_GENRE,
    genre
});

const receiveGenres = genres => ({
    type: RECEIVE_GENRES,
    genres
});