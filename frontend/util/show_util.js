export const fetchShows = () => {
    return $.ajax({
        method: 'GET',
        url: 'api/shows'
    });
};

export const fetchShow = id => {
    return $.ajax({
        method: 'GET',
        url: `api/shows/${id}`
    });
};

export const fetchVideo = id => {
    return $.ajax({
        method: "GET",
        url: `api/videos/${id}`
    });
};

export const fetchMovies = () => {
    return $.ajax({
        method: "GET",
        url: "/api/shows/movies"
    });
};

export const fetchTVShows = () => {
    return $.ajax({
        method: "GET",
        url: "/api/shows/tv"
    });
};

export const searchShows = query => {
    return $.ajax({
        method: 'GET',
        url: 'api/search',
        data: { query_string: query },
    });
}

export const fetchMyListShows = () => {
    return $.ajax({
        method: 'GET',
        url: 'api/my_list/shows',
    });
}