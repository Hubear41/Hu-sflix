export const addMyListVideo = (userId, showId) => {
    const my_list = {
        profile_id: userId,
        show_id: showId,
    };
    
    return $.ajax({
        method: 'POST',
        url: `api/users/${userId}/my_list`,
        data: { my_list },
    });
};

export const removeMyListVideo = (userId, showId) => {
    return $.ajax({
        method: 'POST',
        url: `api/my_list`,
        data: { profile_id: userId, show_id: showId },
    });
};