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
    },
    resetSearchValue: (state) => {
      state.searchValue = "";
    },
  },
  extraReducers: () => {}
});

export const { searchInputChange, resetSearchValue } = moviesSlice.actions;
export default moviesSlice.reducer;