// store.js
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import loadingReducer from "./slices/loading";
import customerReducer from "./slices/customer";
import postReducer from "./slices/post";

const rootReducer = combineReducers({
  loading: loadingReducer,
  customer: customerReducer,
  post: postReducer,
});

// Cấu hình store
const store = configureStore({
  reducer: rootReducer,
});

export default store;
