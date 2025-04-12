import { AddRemoveRequest } from "../DTOs/add-remove";

export interface IUserLikeService{
    add(addRemove: AddRemoveRequest): Promise<number[] | null>;
    remove(addRemove: AddRemoveRequest): Promise<number[] | null>;
}