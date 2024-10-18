import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from "./slices/loading";
import customerReducer from "./slices/customer";

const store = configureStore({
  reducer: {
    loading: loadingReducer,
    customerReducer: customerReducer,
  },
});

export default store;
