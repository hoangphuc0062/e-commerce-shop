import { configureStore } from "@reduxjs/toolkit";
import staffReducer from "./slices/staff";

const store = configureStore({
  reducer: {
    staff: staffReducer,
  },
});

export default store;
