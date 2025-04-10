import { IMovie } from "../dto/IMovie";

export const calcPaginationAmount = (list: string[] | IMovie[], itemsPerPage: number): number => {
    let paginationAmount = list.length / itemsPerPage;
    paginationAmount = Math.floor(paginationAmount);
    if (list.length % itemsPerPage !== 0) {
        paginationAmount++;
    }
    return paginationAmount;
}