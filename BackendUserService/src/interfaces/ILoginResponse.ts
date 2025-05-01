import { ISignupResponse } from "./ISignupResponse";

export interface ILoginResponse extends ISignupResponse{
    active: boolean;
}