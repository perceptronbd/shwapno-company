import { createSlice } from "@reduxjs/toolkit";
import type { AuthState } from "../states/auth.state";
import { authApi } from "../services/auth.service";
import { RootState } from "..";
import storage from "../../utils/local-storage";

const initialState: AuthState = {
  user: null,
  accessToken: "",
  selectedBranchId: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    accessTokenRefresh: (state, action) => {
      state.accessToken = action.payload.accessToken;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        authApi.endpoints.login.matchFulfilled,
        (state, { payload }) => {
          state.user = payload.user;
          state.accessToken = payload.accessToken;
          state.selectedBranchId = payload.user!.branches[0].id;
          storage.set("loggedUser", payload.user);
        },
      )
      .addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
        state.user = null;
        state.accessToken = "";
        storage.remove("loggedUser");
      });
  },
});

export const selectAccessToken = (state: RootState) => state.auth.accessToken;

export const selectSelectedBranchId = (state: RootState) =>
  state.auth.selectedBranchId;

export const { accessTokenRefresh } = authSlice.actions;

export default authSlice.reducer;
