import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from "./slices/loading";

const store = configureStore({
  reducer: {
    loading: loadingReducer,
  },
});

export default store;
