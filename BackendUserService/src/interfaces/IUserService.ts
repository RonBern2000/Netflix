import { AuthFormData } from "../DTOs/schema";
import { ILoginResponse } from "./ILoginResponse";
import { ISignupResponse } from "./ISignupResponse";

export interface IUserService{
    checkUserExist(email: string): Promise<boolean>;
    login(data: AuthFormData): Promise<ILoginResponse>;
    signup(data: AuthFormData): Promise<ISignupResponse>;
    refresh(refreshToken: string): Promise<string>;
}