import { configureStore } from "@reduxjs/toolkit";
import staffReducer from "./slices/staff";
import loadingReducer from "./slices/loading";

const store = configureStore({
  reducer: {
    loading: loadingReducer,
    staff: staffReducer,
  },
});

export default store;
