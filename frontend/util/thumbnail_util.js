export const getPageCount = (showCount, windowSize) => {
  return Math.ceil(showCount / getThumbnailCount(windowSize));
};

export const getThumbnailCount = windowSize => {
  if (windowSize < 500) {
    return 2;
  } else if (windowSize < 800) {
    return 3;
  } else if (windowSize < 1100) {
    return 4;
  } else if (windowSize < 1400) {
    return 5;
  } else {
    return 6;
  }
};

export const getFontSize = windowSize => {
  if (windowSize <= 200) {
    return 3.5;
  } else if (windowSize >= 1400) {
    return 4.5;
  } else {
    const newSize = 3.5 + ((windowSize - 200) % 300) / 300;

    return newSize;
  }
};
