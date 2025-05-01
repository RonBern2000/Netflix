import { AuthFormData } from "../DTOs/schema";
import { ILoginResponse } from "./ILoginResponse";
import { ISignupResponse } from "./ISignupResponse";
import { IUser } from "./IUser";
import { IUserPayload } from "./IUserPayload";

export interface IUserService{
    findUser(id: string): Promise<boolean>
    checkUserExist(email: string): Promise<boolean>;
    login(data: AuthFormData): Promise<ILoginResponse>;
    signup(data: AuthFormData): Promise<ISignupResponse>;
    refresh(refreshToken: string): Promise<string>;
    verify(refreshToken: string): Promise<IUserPayload>;
}