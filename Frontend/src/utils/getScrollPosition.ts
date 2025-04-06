export const getScrollPosition = (element: HTMLElement) => {
  const { scrollLeft, scrollWidth, clientWidth } = element;
  return {
    atLeft: scrollLeft === 0,
    atRight: scrollLeft + clientWidth >= scrollWidth,
  };
};
