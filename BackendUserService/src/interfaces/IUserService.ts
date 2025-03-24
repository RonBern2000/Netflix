import { LoginRequestDTO } from "../DTOs/login-dto";
import { SignupRequestDTO } from "../DTOs/signup-dto";

export interface IUserService{
    login(data: LoginRequestDTO): Promise<string>;
    signup(data: SignupRequestDTO): Promise<string>;
}