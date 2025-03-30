import { IBaseUser } from "./IBaseUser";

export interface IUser extends IBaseUser{
    id: string;
    active: boolean;
}