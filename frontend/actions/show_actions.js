import * as ShowUTIL from '../util/show_util';

export const RECEIVE_VIDEO = 'RECEIVE_VIDEO';
export const RECEIVE_SHOW = 'RECEIVE_SHOW';
export const RECEIVE_SHOWS = 'RECEIVE_SHOWS';

export const fetchVideo = id => dispatch => {
    return ShowUTIL.fetchVideo(id).then(video => dispatch(receiveVideo(video)) );
};

export const fetchShows = () => dispatch => {
    return ShowUTIL.fetchShows().then( payload => dispatch(receiveShows(payload)) );
};

export const fetchShow = id => dispatch => {
    return ShowUTIL.fetchShow(id).then( show => dispatch(receiveShow(show)) );
};

const receiveVideo = video => ({
    type: RECEIVE_VIDEO,
    video,
});

const receiveShows = ({ shows, videos }) => ({
    type: RECEIVE_SHOWS,
    shows,
    videos,
});

const receiveShow = show => ({
    type: RECEIVE_SHOW,
    show,
})
