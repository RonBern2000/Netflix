import { SignupRequestDTO } from "../DTOs/signup-dto";
import { IUser } from "./IUser";

export interface IUserRepository{
    findUserByEmail(email: string): Promise<IUser | null>;
    create(data: SignupRequestDTO): Promise<IUser | null>;
    updateUserStatus(id: string, active: boolean): Promise<void>;
    findUserById(id: string): Promise<IUser | null>;
}