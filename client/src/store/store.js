import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../store/authSlice";

import  baseApi from "../services/baseApi";

 const store = configureStore({
  reducer: {
    auth: authReducer,

    [baseApi.reducerPath]: baseApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
 });

 export default store
