import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from "./slices/loading";
import customerReducer from "./slices/customer";
import postReducer from "./slices/post"

const store = configureStore({
  reducer: {
    loading: loadingReducer,
    customerReducer: customerReducer,
    postReducer: postReducer,
  },
});

export default store;
