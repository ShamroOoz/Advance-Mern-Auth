import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
//GlobalSlice
import { GlobalSplitApi } from "./GlobalSplitApi";
import authSlice from "./Slices/AuthapiSlice";

//reducers
const reducer = {
  [GlobalSplitApi.reducerPath]: GlobalSplitApi.reducer,
  Userauth: authSlice,
};

//config store
export const store = configureStore({
  reducer,
  middleware: (gDM) => gDM().concat(GlobalSplitApi.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

setupListeners(store.dispatch);
