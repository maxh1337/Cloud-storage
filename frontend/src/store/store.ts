import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistStore,
} from "redux-persist";

import { changeTypeSlice } from "./change-type/change-type.slice";
import { filtersSlice } from "./filters/filters.slice";
import { userSlice } from "./user/user.slice";

const isClient = typeof window !== "undefined";

const combinedReducers = combineReducers({
  user: userSlice.reducer,
  filters: filtersSlice.reducer,
  changeType: changeTypeSlice.reducer,
});

let mainReducer = combinedReducers;

if (isClient) {
  const { persistReducer } = require("redux-persist");
  const storage = require("redux-persist/lib/storage").default;

  const persistConfig = {
    key: "amazon-v2",
    storage,
    whitelist: ["cart"],
  };

  mainReducer = persistReducer(persistConfig, combinedReducers);
}

export const store = configureStore({
  reducer: mainReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type TypeRootState = ReturnType<typeof mainReducer>;
