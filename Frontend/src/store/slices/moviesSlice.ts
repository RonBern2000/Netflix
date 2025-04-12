import { createSlice } from "@reduxjs/toolkit";

interface MoviesState{
    message: string;
}

const initialState: MoviesState = {
    message: '',
}

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
  },
  extraReducers: () => {}
});

//export const { } = moviesSlice.actions;
export default moviesSlice.reducer;