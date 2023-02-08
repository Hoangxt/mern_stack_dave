import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";

export const store = configureStore({
  // Add the generated api reducer to the store
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer, // Add the generated reducer to the store
  },
  // Add the generated api middleware to the store
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),

  devTools: true, // enable Redux DevTools
});
