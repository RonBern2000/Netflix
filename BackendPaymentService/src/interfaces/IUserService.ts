import { IUser } from "./IUser";

export interface IUserService{
    pay(id: string): Promise<IUser | null>;
}