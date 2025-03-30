import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthResponse } from "../../dto/AuthResponse";
import { checkWhatToken } from "../../utils/checkWhatToken";

interface AuthState {
    token: string;
    isAuthenticated: boolean;
    error: string | null;
    message: string | null;
}

const initialState: AuthState = {
    token: "",
    isAuthenticated: false,
    error: null,
    message: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<AuthResponse>) => {
      state.token = action.payload.token;
      state.message = action.payload.message;
      const active = checkWhatToken();
      state.isAuthenticated = active;
    },
    signup: (state, action: PayloadAction<AuthResponse>) => {
      state.token = action.payload.token;
      state.message = action.payload.message;
      const active = checkWhatToken();
      state.isAuthenticated = active;
    },
    logout: (state) => {
      state.token = "";
      state.message = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: () => {}
});

export const { login, signup, logout } = authSlice.actions;
export default authSlice.reducer;