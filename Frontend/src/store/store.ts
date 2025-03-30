import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { moviesApiSlice } from "./slices/moviesApiSlice";
import { usersApiSlice } from "./slices/authApiSlice";
import authReducer from "./slices/authSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        [moviesApiSlice.reducerPath]: moviesApiSlice.reducer,
        [usersApiSlice.reducerPath]: usersApiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(moviesApiSlice.middleware).concat(usersApiSlice.middleware);
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDisptach = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDisptach>(); 
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;