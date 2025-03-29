// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { PopMoviesResponse } from "../../api/api";
// import { IMovie } from "../../dto/IMovie";

// interface MoviesState{
//     message: string;
//     popMovies: IMovie[];
// }

// const initialState: MoviesState = {
//     message: '',
//     popMovies: [],
// }

// const moviesSlice = createSlice({
//   name: "movies",
//   initialState,
//   reducers: {
//     loadPopMovies: (state, action: PayloadAction<PopMoviesResponse>) => {
//       state.popMovies = action.payload.popMovies;
//       state.message = action.payload.message;
//     },
//   },
//   extraReducers: () => {}
// });

// export const { loadPopMovies } = moviesSlice.actions;
// export default moviesSlice.reducer;

// export const loadPopMovies = createAsyncThunk(
//     "movies/loadPopMovies",
//     async (popMoviesResponse: PopMoviesResponse , { rejectWithValue }) => {
//         try {
//             return popMoviesResponse;
//         } catch (error) {
//             const errorMessage: string = getErrorMessage(error);
//             return rejectWithValue(errorMessage);
//         }
//     }
// );

// const moviesSlice = createSlice({
//     name: "movies",
//     initialState,
//     reducers: {
//         loadPopMovies: 
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(loadPopMovies.fulfilled, (state, action) => {
//                 state.popMovies = action.payload.popMovies;
//                 state.message = action.payload.message;
//             })
//             .addCase(loadPopMovies.rejected, (state) => {
//                 state.popMovies = [];
//                 state.message = '';
//             })
//     }
// });