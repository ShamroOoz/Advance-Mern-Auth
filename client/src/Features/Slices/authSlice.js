import { createSlice } from "@reduxjs/toolkit";
import { AuthapiSlice as api } from "./AuthapiSlice";
const initialState = {
  accessToken: null,
  status: false,
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateAccessToken(state, action) {
      state.accessToken = action.payload?.token;
      state.status = true;
    },
    resetTodefault(state) {
      state.accessToken = null;
      state.status = false;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.logoutUser.matchFulfilled,
      (state, action) => {
        state.accessToken = null;
        state.status = false;
      }
    );
    builder.addMatcher(
      api.endpoints.loginUser.matchFulfilled,
      (state, { payload }) => {
        if (payload?.sucess) {
          state.accessToken = payload?.token;
          state.status = true;
        }
      }
    );
    builder.addMatcher(
      api.endpoints.registerUser.matchFulfilled,
      (state, { payload }) => {
        if (payload?.sucess) {
          state.accessToken = payload?.token;
          state.status = true;
        }
      }
    );
  },
});

// Action creators are generated for each case reducer function
export const { updateAccessToken, resetTodefault } = authSlice.actions;
export const userSelector = (state) => state.user;

export default authSlice.reducer;
