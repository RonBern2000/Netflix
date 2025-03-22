import { LoginRequestDTO } from "./login-dto";

export interface SignupRequestDTO extends LoginRequestDTO{
    name: string;
}