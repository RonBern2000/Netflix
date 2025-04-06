import { createSlice } from "@reduxjs/toolkit";

interface MoviesState{
    message: string;
    trailerKeys: string[];
}

const initialState: MoviesState = {
    message: '',
    trailerKeys: [],
}

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    // addTrailerKey: (state, action: PayloadAction<>) => {
    //   state.token = action.payload.token;
    //   state.message = action.payload.message;
    //   state.isAuthenticated = true;
    //   state.isActive = action.payload.active
    // },
  },
  extraReducers: () => {}
});

//export const { } = moviesSlice.actions;
export default moviesSlice.reducer;