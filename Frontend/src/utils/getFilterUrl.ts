export const getFilterUrl = (title: string): string => {
    const link = `/search?title=${title}`;
    return link;
}