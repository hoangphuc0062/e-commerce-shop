// store.js
import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from "./slices/loading";
import customerReducer from "./slices/customer";
import storage from "redux-persist/lib/storage"; // sử dụng localStorage

import { combineReducers } from "redux";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

// Cấu hình persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["customer"], // chỉ lưu reducer customer
};

// Kết hợp các reducer lại
const rootReducer = combineReducers({
  loading: loadingReducer,
  customer: customerReducer,
});

// Tạo persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Cấu hình store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Tạo persistor
export const persistor = persistStore(store);
export default store;
