import { LoginRequestDTO } from "../DTOs/login-dto";
import { SignupRequestDTO } from "../DTOs/signup-dto";

export interface IUserService{
    checkUserExist(email: string): Promise<boolean>;
    login(data: LoginRequestDTO): Promise<string>;
    signup(data: SignupRequestDTO): Promise<string>;
}