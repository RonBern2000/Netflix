import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MoviesState{
    message: string;
    searchValue: string;
}

const initialState: MoviesState = {
    message: '',
    searchValue: '',
}

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    searchInputChange: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    }
  },
  extraReducers: () => {}
});

export const { searchInputChange } = moviesSlice.actions;
export default moviesSlice.reducer;