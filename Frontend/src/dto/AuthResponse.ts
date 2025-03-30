export interface BaseResponse{
    message: string;
}

export interface AuthResponse extends BaseResponse{
    token: string;
}