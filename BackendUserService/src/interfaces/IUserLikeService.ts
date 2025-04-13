import { AddRemoveRequest } from "../DTOs/add-remove";
import { IMovie } from "./IMovie";

export interface IUserLikeService{
    add(addRemove: AddRemoveRequest): Promise<IMovie[] | null>;
    remove(addRemove: AddRemoveRequest): Promise<IMovie[] | null>;
}