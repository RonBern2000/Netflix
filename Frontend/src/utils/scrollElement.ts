export const scrollElement = (
  element: HTMLElement,
  direction: "left" | "right"
) => {
  const scrollAmount = element.offsetWidth;
  const newScrollLeft =
    direction === "right"
      ? Math.min(
          element.scrollLeft + scrollAmount,
          element.scrollWidth - element.clientWidth
        )
      : Math.max(element.scrollLeft - scrollAmount, 0);

  element.scrollTo({
    left: newScrollLeft,
    behavior: "smooth",
  });
};