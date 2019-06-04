export const fetchGenre = id => {
    return $.ajax({
        method: 'GET',
        url: `api/genres/${id}`
    });
};

export const fetchGenres = () => {
    return $.ajax({
        method: 'GET',
        url: 'api/genres'
    });
};