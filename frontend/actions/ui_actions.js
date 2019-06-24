export const PREVIEWING = 'PREVIEWING';
export const NOT_PREVIEWING = 'NOT_PREVIEWING';

export const receivePreview = () => ({
    type: PREVIEWING,
});

export const receiveNoPreview = () => ({
    type: NOT_PREVIEWING,
});