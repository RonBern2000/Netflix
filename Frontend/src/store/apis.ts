import { BaseQueryFn, FetchArgs, FetchBaseQueryError, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { RootState } from "./store";
import { setAccessToken, logout } from "./slices/authSlice";
import { Mutex } from 'async-mutex';

interface RefreshResponse {
  accessToken: string;
}

const mutex = new Mutex();

export const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:5000",
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.accessToken;
        if(token){
            headers.set("authorization", `Bearer ${token}`);
        }
        return headers;
    },
    credentials: 'include',
});

export const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    await mutex.waitForUnlock();

    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 'PARSING_ERROR' && result.error.originalStatus === 401) {
        if (!mutex.isLocked()) {
        const release = await mutex.acquire();

        try {
            const refreshResult = await baseQuery('/api/v1/users/refresh', api, extraOptions);
            const data = refreshResult.data as RefreshResponse;

            if (data) {
                const newToken = data.accessToken;
                api.dispatch(setAccessToken(newToken));

                result = await baseQuery(args, api, extraOptions);
            } else {
                api.dispatch(logout());
            }
        } finally {
            release();
        }
    } else {
        await mutex.waitForUnlock();
        result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
}