import { configureStore } from "@reduxjs/toolkit";
import staffReducer from "./slices/staff";
import loadingReducer from "./slices/loading";
import customerReducer from "./slices/customer";
import postReducer from "./slices/post";
import categoryReducer from "./slices/category";
import brandReducer from "./slices/brand";
import collectionReducer from "./slices/collection";
import warehouseReducer from "./slices/warehouse";
import productReducer from "./slices/product";
import attributeReducer from "./slices/attribute";
import tagReducer from "./slices/tags";
import webConfigReducer from "./slices/webComfig";
import paymentReducer from "./slices/paynents";
import couponReducer from "./slices/coupon";

const store = configureStore({
  reducer: {
    loading: loadingReducer,
    staff: staffReducer,
    customer: customerReducer,
    post: postReducer,
    category: categoryReducer,
    brand: brandReducer,
    collection: collectionReducer,
    warehouse: warehouseReducer,
    product: productReducer,
    attribute: attributeReducer,
    tag: tagReducer,
    webConfig: webConfigReducer,
    payment: paymentReducer,
    coupon: couponReducer,
  },
});

export default store;
