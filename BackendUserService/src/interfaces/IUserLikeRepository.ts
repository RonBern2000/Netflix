import { AddRemoveRequest } from "../DTOs/add-remove";
import { IMovie } from "./IMovie";

export interface IUserLikeRepository{
    add(addRemove: AddRemoveRequest): Promise<Record<number, IMovie> | null>;
    remove(addRemove: AddRemoveRequest): Promise<Record<number, IMovie> | null>;
}