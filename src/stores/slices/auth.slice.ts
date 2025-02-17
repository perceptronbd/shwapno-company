import { createSlice } from "@reduxjs/toolkit";
import type { AuthState } from "../states/auth.state";
import { authApi } from "../services/auth.service";

const savedAuth = sessionStorage.getItem("userData");
console.log(savedAuth);
const initialState: AuthState = savedAuth
  ? JSON.parse(savedAuth)
  : {
      user: null,
      isAuthenticated: false,
    };

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        authApi.endpoints.login.matchFulfilled,
        (state, { payload }) => {
          // Action on successful login
          state.user = payload.data;
          state.isAuthenticated = true;
          sessionStorage.setItem("userData", JSON.stringify(state));
        },
      )
      .addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        sessionStorage.removeItem("userData");
      });
  },
});

export default authSlice.reducer;
