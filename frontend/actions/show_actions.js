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
    return ShowUTIL.fetchShow(id).then( payload => dispatch(receiveShow(payload)) );
};

const receiveVideo = video => ({
    type: RECEIVE_VIDEO,
    video,
});

const receiveShows = ({ shows, videos, genres }) => ({
    type: RECEIVE_SHOWS,
    shows,
    videos,
    genres,
});

const receiveShow = ({show, nextShow, video}) => ({
    type: RECEIVE_SHOW,
    show,
    nextShow,
    video,
});
