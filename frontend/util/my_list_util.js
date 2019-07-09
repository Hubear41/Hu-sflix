export const addMyListVideo = (userId, videoId) => {
    return $.ajax({
        method: 'POST',
        url: `api/users/${userId}/my_list_video`,
        data: { video_id: videoId },
    });
};

export const removeMyListVideo = id => {
    return $.ajax({
        method: 'DELETE',
        url: `api/my_list_videos/${id}`,
    });
};