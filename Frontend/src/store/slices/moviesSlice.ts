import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loadPopMoviesRequest, PopMoviesResponse } from "../../api/api";
import { getErrorMessage } from "../../utils/axiosErrorHandler";
import { IMovie } from "../../dto/IMovie";

interface MoviesState{
    popMovies: IMovie[];
}

const initialState: MoviesState = {
    popMovies: [],
}

export const loadPopMovies = createAsyncThunk(
    "movies/loadPopMovies",
    async (_, { rejectWithValue }) => {
        try {
            const response: PopMoviesResponse = await loadPopMoviesRequest();
            return response;
        } catch (error) {
            const errorMessage: string = getErrorMessage(error);
            return rejectWithValue(errorMessage);
        }
    }
);

const moviesSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadPopMovies.fulfilled, (state, action) => {
                state.popMovies = action.payload.popMovies;
            })
    }
});

export default moviesSlice.reducer;