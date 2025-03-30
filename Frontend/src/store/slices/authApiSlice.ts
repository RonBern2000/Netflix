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
            checkEmail:builder.mutation<boolean, string>({
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
        };
    }
});

export const { useCreateUserMutation, useCheckEmailMutation } = usersApiSlice;