import { AddRemoveRequest } from "../DTOs/add-remove";
import { IMovie } from "./IMovie";

export interface IUserLikeRepository{
    getMyList(userId: string): Promise<Record<number, IMovie> | []>;
    add(addRemove: AddRemoveRequest): Promise<Record<number, IMovie> | null>;
    remove(addRemove: AddRemoveRequest): Promise<Record<number, IMovie> | null>;
}