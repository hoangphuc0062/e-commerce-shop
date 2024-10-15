import { configureStore } from "@reduxjs/toolkit";
import staffReducer from "./slices/staff";
import loadingReducer from "./slices/loading";
import customerReducer from "./slices/customer";
import postReducer from "./slices/post";
import categoryReducer from "./slices/category";
import iconReducer from "./slices/icon";

const store = configureStore({
  reducer: {
    loading: loadingReducer,
    staff: staffReducer,
    customer: customerReducer,
    post: postReducer,
    category: categoryReducer,
    icon: iconReducer,
  },
});

export default store;
