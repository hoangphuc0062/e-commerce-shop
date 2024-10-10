import { configureStore } from "@reduxjs/toolkit";
import staffReducer from "./slices/staff";
import loadingReducer from "./slices/loading";
import customerReducer from "./slices/customer";

const store = configureStore({
  reducer: {
    loading: loadingReducer,
    staff: staffReducer,
    customer: customerReducer,
  },
});

export default store;
