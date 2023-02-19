import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { unistoryApi } from "./unistory/unistory-api";

export const store = configureStore({
  reducer: {
    [unistoryApi.reducerPath]: unistoryApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(unistoryApi.middleware),
});

setupListeners(store.dispatch);

// export type AppDispatch = typeof store.dispatch;
// export type RootState = ReturnType<typeof store.getState>;
