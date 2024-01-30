import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import authSliceReducer from "./auth/authSlice";
import orderReducer from "../redux/order/OrderSlice";
import productReducer from "../redux/products/productSlice";
import sidebarReducer from "../redux/sidebar/sidebarSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSliceReducer,
    orderSearch: orderReducer,
    productSearch: productReducer,
    sidebarShow: sidebarReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
