import * as MyListUTIL from '../util/my_list_util';

export const RECEIVE_MYLIST_INFO = 'RECEIVE_MYLIST_VIDEO';

const receiveMyListInfo = user => ({
    type: RECEIVE_MYLIST_INFO,
    user
});

export const addMyListVideo = (userId, videoId) => dispatch => {
    return MyListUTIL.addMyListVideo(userId, videoId).then( user => dispatch(receiveMyListInfo(user)));
};

export const removeMyListVideo = id => dispatch => {
    return MyListUTIL.removeMyListVideo(id).then( user => dispatch(receiveMyListInfo(user)));
}