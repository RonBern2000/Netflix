import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import moviesReducer from "./slices/moviesSlice";

const store = configureStore({
    reducer: {
        popMovies: moviesReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDisptach = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDisptach>(); 
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;