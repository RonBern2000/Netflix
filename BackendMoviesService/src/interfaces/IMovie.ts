import { IBaseMovie } from "./IBaseMovie";

export interface IMovie extends IBaseMovie{
    id: string;
    trailer: string;
}