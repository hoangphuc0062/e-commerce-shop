import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth";
import categoryReducer from "./slices/category";
const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
  },
});

export default store;
