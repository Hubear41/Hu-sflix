import * as MyListUTIL from '../util/my_list_util';

export const RECEIVE_MYLIST_INFO = 'RECEIVE_MYLIST_VIDEO';

const receiveMyListInfo = user => ({
    type: RECEIVE_MYLIST_INFO,
    user
});

export const addMyListVideo = (userId, showId) => dispatch => {
    return MyListUTIL.addMyListVideo(userId, showId).then( user => dispatch(receiveMyListInfo(user)));
};

export const removeMyListVideo = (userId, showId) => dispatch => {
    return MyListUTIL.removeMyListVideo(userId, showId).then( user => dispatch(receiveMyListInfo(user)));
}