import { AddRemoveRequest } from "../DTOs/add-remove";
import { IMovie } from "./IMovie";

export interface IUserLikeService{
    getMyList(userId: string): Promise<Record<number, IMovie> | null>
    add(addRemove: AddRemoveRequest): Promise<Record<number, IMovie> | null>;
    remove(addRemove: AddRemoveRequest): Promise<Record<number, IMovie> | null>;
}