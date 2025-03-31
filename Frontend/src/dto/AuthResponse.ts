export interface BaseResponse{
    message: string;
}

export interface EmailResponse{
    email: string;
}

export interface AuthResponse extends BaseResponse{
    token: string;
}