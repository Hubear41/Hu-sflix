import * as ShowUTIL from '../util/show_util';
import * as VideoAPI from '../util/video_util';

export const RECEIVE_VIDEO = 'RECEIVE_VIDEO';

export const fetchVideo = id => dispatch => {
    return VideoAPI.fetchVideo(id).then(video => receiveVideo(video))
}

const receiveVideo = video => ({
    type: RECEIVE_VIDEO,
    video,
});


