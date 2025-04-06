export const scrollElement = (
  element: HTMLElement,
  direction: "left" | "right"
) => {
  const scrollAmount = element.offsetWidth;
  element.scrollBy({
    left: direction === "right" ? scrollAmount : -scrollAmount,
    behavior: "smooth",
  });
};