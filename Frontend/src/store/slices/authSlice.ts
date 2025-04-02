import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthResponse, EmailResponse } from "../../dto/AuthResponse";

interface AuthState {
    token: string;
    isAuthenticated: boolean;
    isActive: boolean,
    email: string;
    error: string | null;
    message: string | null;
}

const initialState: AuthState = {
    token: "",
    isAuthenticated: false,
    isActive: false,
    email: "",
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
      state.isAuthenticated = true;
      state.isActive = action.payload.active
    },
    signup: (state, action: PayloadAction<AuthResponse>) => {
      state.token = action.payload.token;
      state.message = action.payload.message;
      state.isAuthenticated = true;
      state.isActive = false;
    },
    logout: (state) => {
      state.token = "";
      state.email = "";
      state.message = null;
      state.error = null;
      state.isAuthenticated = false;
      state.isActive = false;
    },
    pay: (state) => {
      state.token = "";
      state.message = null;
      state.isAuthenticated = false;
      state.isActive = false;
    },
    setEmail: (state, action: PayloadAction<EmailResponse>) => {
      state.email = action.payload.email;
    },
  },
  extraReducers: () => {}
});

export const { login, signup, logout, setEmail } = authSlice.actions;
export default authSlice.reducer;