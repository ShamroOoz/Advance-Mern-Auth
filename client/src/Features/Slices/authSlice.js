import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: 0,
};

export const authSlice = createSlice({
  name: "Userauth",
  initialState,
  reducers: {
    updateAccessToken(state, action) {
      state.accessToken = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateAccessToken } = authSlice.actions;
export const userSelector = (state) => state.Userauth;

export default authSlice.reducer;

// export const authReducer = persistReducer(
//   {
//     key: "rtk:auth",
//     storage,
//     whitelist: ["accessToken"],
//   },
//   authSlice.reducer
// );
