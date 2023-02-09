import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  // Add the generated api reducer to the store
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer, // Add the generated reducer to the store
    auth: authReducer,
  },
  // Add the generated api middleware to the store
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),

  devTools: true, // enable Redux DevTools
});

setupListeners(store.dispatch);
