import { createApi} from '@reduxjs/toolkit/query/react';
import { IUser } from '../../dto/IUser';
import { AuthResponse } from '../../dto/AuthResponse';
import { baseQueryWithReauth } from '../apis';

export const usersApiSlice = createApi({
    reducerPath: "authApi",
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => {
        return {
            checkEmail: builder.mutation<{isExist: boolean}, {email: string}>({
                query: (emailData) => ({
                    url: "/api/v1/users/users/checkEmail",
                    method: "POST",
                    body: emailData,
                }),
            }),
            createUser: builder.mutation<AuthResponse, Omit<IUser, "id">>({
                query: (newUser) => ({
                    url: "/api/v1/users/users/signup",
                    method: "POST",
                    body: newUser,
                }),
            }),// TODO: Move this two to a new apiSlice paymentApiSlice
            payAndActivateUser: builder.query<{ approvalUrl: string, subscriptionId: string }, void>({
                query: () => "/api/v1/payments/payments/subscribe",
                transformResponse: (response: { approvalUrl: string, subscriptionId: string }) => ({
                    approvalUrl: response.approvalUrl,
                    subscriptionId: response.subscriptionId
                }),
            }),
            paymentSuccess: builder.mutation<void, string>({
                query: (subId) => ({
                    url: `/api/v1/payments/payments/paymentSuccess?subscription_id=${subId}`,
                    method: "POST",
                }),
            }),
            logoutUser: builder.mutation<void, void>({
                query: () => ({
                    url: "/api/v1/users/users/logout",
                    method: "POST",
                }),
            }),
            login: builder.mutation<AuthResponse, Omit<IUser, "id">>({
                query: (user) => ({
                    url: "/api/v1/users/users/login",
                    method: "POST",
                    body: user,
                }),
            }),
            checkStatus: builder.query<boolean,void>({
                query: () => "/api/v1/users/users/checkStatus",
                transformResponse: (response: { active: boolean }) => response.active,
            }),
        };
    }
});

export const { useCreateUserMutation, useCheckEmailMutation , useLazyPayAndActivateUserQuery, usePaymentSuccessMutation, useLogoutUserMutation, useLoginMutation, useCheckStatusQuery} = usersApiSlice;