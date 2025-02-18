import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth.slice";
import { secureApi } from "./services/secure.service";
import { baseApi } from "./services/base.service";

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      [secureApi.reducerPath]: secureApi.reducer,
      [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(secureApi.middleware)
        .concat(baseApi.middleware),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
