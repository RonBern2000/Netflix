import { LoginRequestDTO } from "../DTOs/login-dto";
import { SignupRequestDTO } from "../DTOs/signup-dto";
import { ILoginResponse } from "./ILoginResponse";

export interface IUserService{
    checkUserExist(email: string): Promise<boolean>;
    login(data: LoginRequestDTO): Promise<ILoginResponse>;
    signup(data: SignupRequestDTO): Promise<string>;
}