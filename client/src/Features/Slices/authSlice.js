import { createSlice } from "@reduxjs/toolkit";

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
});

// Action creators are generated for each case reducer function
export const { updateAccessToken, resetTodefault } = authSlice.actions;
export const userSelector = (state) => state.user;

export default authSlice.reducer;
