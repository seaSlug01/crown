export const convertPixelsToVw = elHeight => {
  return (elHeight * 100) / window.innerWidth + 'vw';
};
