import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";
import authReducer from "../features/auth/authSlice";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

setupListeners(store.dispatch);

// infer the AppState type from the store
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
