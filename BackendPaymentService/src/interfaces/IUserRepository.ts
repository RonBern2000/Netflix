import { IUser } from "./IUser";

export interface IUserRepository{
    getUser(id: string): Promise<IUser | null>;
    pay(id: string): Promise<IUser | null>;
}