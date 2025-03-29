import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { moviesApiSlice } from "./slices/moviesApiSlice";

const store = configureStore({
    reducer: {
        [moviesApiSlice.reducerPath]: moviesApiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(moviesApiSlice.middleware);
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDisptach = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDisptach>(); 
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;