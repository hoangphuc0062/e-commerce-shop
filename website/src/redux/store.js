import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth";
import categoryReducer from "./slices/category";
import bannerReducer from "./slices/barnner";
import productReducer from "./slices/product";
const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
    banner: bannerReducer,
    product: productReducer,
  },
});

export default store;
