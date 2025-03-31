import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { IUser } from '../../dto/IUser';
import { AuthResponse } from '../../dto/AuthResponse';

export const usersApiSlice = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000",
    }),
    endpoints: (builder) => {
        return {
            checkEmail:builder.mutation<{isExist: boolean}, string>({
                query: (email) => ({
                    url: "/users/api/v1/users/checkEmail",
                    method: "POST",
                    body: email,
                }),
            }),
            createUser: builder.mutation<AuthResponse, Omit<IUser, "id">>({
                query: (newUser) => ({
                    url: "/users/api/v1/users/signup",
                    method: "POST",
                    body: newUser,
                }),
            }),
            payAndActivateUser: builder.mutation<void, void>({ // TODO: Actual logic interms what we send and receive
                query: (_) => ({
                    url: "/payments/api/v1/payments/payAndActivate",
                    method: "POST",
                    body: _,
                }),
            })
        };
    }
});

export const { useCreateUserMutation, useCheckEmailMutation , usePayAndActivateUserMutation } = usersApiSlice;