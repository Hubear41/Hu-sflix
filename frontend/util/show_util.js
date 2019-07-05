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

export const fetchPreviewVideos = () => {
    return $.ajax({ 
        method: 'GET',
        url: 'api/videos'
    });
};

export const searchShows = query => {
    return $.ajax({
        method: 'GET',
        url: 'api/search',
        data: { query_string: query },
    });
}