import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthResponse, EmailResponse } from "../../dto/AuthResponse";

interface AuthState {
    accessToken: string; // can be the temp or the auth depends if the user is an active one(Paying customer)
    isAuthenticated: boolean;
    isActive: boolean,
    email: string;
    error: string | null;
    message: string | null;
}

const initialState: AuthState = {
    accessToken: "",
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
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    login: (state, action: PayloadAction<AuthResponse>) => {
      state.accessToken = action.payload.token;
      state.message = action.payload.message;
      state.isAuthenticated = true;
      state.isActive = action.payload.active
    },
    signup: (state, action: PayloadAction<AuthResponse>) => {
      state.accessToken = action.payload.token;
      state.message = action.payload.message;
      state.isAuthenticated = true;
      state.isActive = false;
    },
    logout: (state) => {
      state.accessToken = "";
      state.email = "";
      state.message = null;
      state.error = null;
      state.isAuthenticated = false;
      state.isActive = false;
    },
    pay: (state) => {
      state.accessToken = "";
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

export const { login, signup, logout, setEmail, pay, setAccessToken } = authSlice.actions;
export default authSlice.reducer;