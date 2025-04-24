import { AuthFormData } from "../DTOs/schema"; 
import { IUser } from "./IUser";

export interface IUserRepository{
    findUserByEmail(email: string): Promise<IUser | null>;
    create(data: AuthFormData): Promise<IUser | null>;
    updateUserStatus(id: string, active: boolean): Promise<void>;
    findUserById(id: string): Promise<IUser | null>;
}