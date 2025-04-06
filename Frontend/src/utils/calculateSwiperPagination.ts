import { IMovie } from "../dto/IMovie";

export const calcPaginationAmount = (list: string[] | IMovie[]): number => {
    let paginationAmount = list.length / 6;
    paginationAmount = Math.floor(paginationAmount);
    if (list.length % 6 !== 0) {
        paginationAmount++;
    }
    return paginationAmount;
}