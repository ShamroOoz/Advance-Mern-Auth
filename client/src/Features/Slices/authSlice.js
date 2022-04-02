import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { AuthapiSlice as api } from "./AuthapiSlice";

const initialState = {
  accessToken: null,
  status: false,
  persist: localStorage.getItem("persist")?.toLowerCase() === "true" || false,
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateAccessToken(state, action) {
      state.accessToken = action.payload?.token;
      state.status = true;
    },
    setpersistState(state, action) {
      state.persist = !state.persist;
      localStorage.setItem("persist", state.persist);
    },
    resetTodefault(state) {
      state.accessToken = null;
      state.status = false;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(
        api.endpoints.logoutUser.matchFulfilled,
        api.endpoints.logoutUser.matchRejected
      ),
      (state, action) => {
        state.accessToken = null;
        state.status = false;
        state.persist = false;
        localStorage.setItem("persist", false);
      }
    );
    builder.addMatcher(
      isAnyOf(
        api.endpoints.loginUser.matchFulfilled,
        api.endpoints.googleLogin.matchFulfilled
      ),

      (state, { payload, meta }) => {
        if (payload?.sucess) {
          state.accessToken = payload?.token;
          state.status = true;
          state.persist = meta.arg?.originalArgs?.persist;
          localStorage.setItem("persist", state.persist);
        }
      }
    );
    builder.addMatcher(
      api.endpoints.refreshToken.matchFulfilled,
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
export const { updateAccessToken, resetTodefault, setpersistState } =
  authSlice.actions;
export const userSelector = (state) => state.user;

export default authSlice.reducer;
