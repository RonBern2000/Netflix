import { AuthFormData } from "../DTOs/schema";
import { ILoginResponse } from "./ILoginResponse";

export interface IUserService{
    checkUserExist(email: string): Promise<boolean>;
    login(data: AuthFormData): Promise<ILoginResponse>;
    signup(data: AuthFormData): Promise<string>;
}