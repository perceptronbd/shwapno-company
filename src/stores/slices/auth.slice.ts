import { createSlice } from "@reduxjs/toolkit";
import type { AuthState } from "../states/auth.state";
import { authApi } from "../services/auth.service";
import { RootState } from "..";
import storage from "../../utils/local-storage";

// Initialize state with values from localStorage if available
const initialState: AuthState = {
  user: null,
  accessToken: "",
  selectedBranchId: (() => {
    const branchId = storage.get("QR-branchId");
    return typeof branchId === 'string' ? branchId : "";
  })(),
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    accessTokenRefresh: (state, action) => {
      state.accessToken = action.payload.accessToken;
    },
    updateSelectedBranchId: (state, action) => {
      state.selectedBranchId = action.payload;
      storage.set("QR-branchId", action.payload);
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

          // Store both user and branch ID in localStorage
          storage.set("loggedUser", payload.user);
          storage.set("QR-branchId", payload.user!.branches[0].id);
        },
      )
      .addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
        state.user = null;
        state.accessToken = "";
        state.selectedBranchId = "";

        // Clear both user and branch ID from localStorage
        storage.remove("loggedUser");
        storage.remove("QR-branchId");
      });
  },
});

export const selectAccessToken = (state: RootState) => state.auth.accessToken;

export const selectSelectedBranchId = (state: RootState) =>
  state.auth.selectedBranchId;

export const { accessTokenRefresh, updateSelectedBranchId } = authSlice.actions;

export default authSlice.reducer;
