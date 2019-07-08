export const PREVIEWING = 'PREVIEWING';
export const NOT_PREVIEWING = 'NOT_PREVIEWING';
export const START_LOADING = 'START_LOADING';
export const STOP_LOADING = 'STOP_LOADING';

export const receivePreview = id => ({
    type: PREVIEWING,
});

export const receiveNoPreview = () => ({
    type: NOT_PREVIEWING,
});

export const startLoading = () => ({
    type: START_LOADING, 
});

export const stopLoading = () => ({
    type: STOP_LOADING,
});