// store.js
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import loadingReducer from "./slices/loading";
import customerReducer from "./slices/customer";
import postReducer from "./slices/post";

import categoryReducer from "./slices/category";
import tagsReducer from "./slices/tags";
import storage from "redux-persist/lib/storage"; // sử dụng localStorage

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

const rootReducer = combineReducers({
  loading: loadingReducer,
  customer: customerReducer,
  post: postReducer,
  category: categoryReducer,
  tags: tagsReducer,
});

// Cấu hình store
const store = configureStore({
  reducer: rootReducer,
});

export default store;
