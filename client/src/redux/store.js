// store.js
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import loadingReducer from "./slices/loading";
import customerReducer from "./slices/customer";
import postReducer from "./slices/post";
import authReducer from "./slices/auth";

import categoryReducer from "./slices/category";
import tagsReducer from "./slices/tags";

const rootReducer = combineReducers({
  auth: authReducer,
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
