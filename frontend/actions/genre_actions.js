import * as GenreUTIL from '../util/genre_util'

export const RECEIVE_GENRE = 'RECEIVE_GENRE';
export const RECEIVE_GENRES = 'RECEIVE_GENRES';
export const RECEIVE_GENRE_SHOWS = 'RECEIVE_GENRE_SHOWS';

export const fetchGenre = id => dispatch => (
    GenreUTIL.fetchGenre(id).then( genre => dispatch(receiveGenre(genre)) )
);

export const fetchGenres = () => dispatch => (
    GenreUTIL.fetchGenres().then( genres => dispatch(receiveGenres(genres)))
);

export const fetchGenreShows = id => dispatch => (
    GenreUTIL.fetchGenreShows(id).then( payload => dispatch(receiveGenreShows(payload)))
)

const receiveGenreShows = payload => ({
    type: RECEIVE_GENRE_SHOWS,
    shows: payload.shows,
    genres: payload.genres,
});

const receiveGenre = genre => ({
    type: RECEIVE_GENRE,
    genre
});

const receiveGenres = genres => ({
    type: RECEIVE_GENRES,
    genres
});