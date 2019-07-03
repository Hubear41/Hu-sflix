export const fetchGenre = id => {
    return $.ajax({
        method: 'GET',
        url: `api/genres/${id}`
    });
};

export const fetchGenreShows = id => {
    return $.ajax({
        method: 'GET',
        url: `api/genre_index/${id}`,
    });
}

export const fetchGenres = () => {
    return $.ajax({
        method: 'GET',
        url: 'api/genres'
    });
};