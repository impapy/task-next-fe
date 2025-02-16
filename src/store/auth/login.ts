/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "./type";

interface AuthState {
  isLoggedIn: boolean;
  token: string | null;
  user: User | null; // User is always either an object or null
}

const initialState: AuthState = {
  isLoggedIn: false,
  token: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ token: string; user: User }>) => {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.user = action.payload.user;

      // Store token & user in localStorage
      localStorage.setItem("accessToken", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      state.user = null;

      // Remove from localStorage
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
    },
    setAuth: (state, action: PayloadAction<AuthState>) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.token = action.payload.token;
      state.user = action.payload.user;

      // Update localStorage
      if (action.payload.token) {
        localStorage.setItem("accessToken", action.payload.token);
      } else {
        localStorage.removeItem("accessToken");
      }

      if (action.payload.user) {
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      } else {
        localStorage.removeItem("user");
      }
    },
    checkAuth: (state) => {
      const token = localStorage.getItem("accessToken");
      const user = localStorage.getItem("user");

      if (token && user) {
        state.isLoggedIn = true;
        state.token = token;
        state.user = JSON.parse(user); // Restore user from localStorage
      }
    },
  },
});

export const { login, logout, setAuth, checkAuth } = authSlice.actions;
export default authSlice.reducer;
