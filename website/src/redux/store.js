import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth";
import categoryReducer from "./slices/category";
import bannerReducer from "./slices/barnner";
const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
    banner: bannerReducer,
  },
});

export default store;
