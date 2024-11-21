import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth";
import categoryReducer from "./slices/category";
import bannerReducer from "./slices/barnner";
import productReducer from "./slices/product";
import orderReducer from "./slices/order";
const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
    banner: bannerReducer,
    product: productReducer,
    order: orderReducer,
  },
});

export default store;
