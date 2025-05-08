import { configureStore } from "@reduxjs/toolkit";
// import thunk from "redux-thunk";
import cartReducer from "../slices/cartsSice";
import productReducer from "../slices/productSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    product: productReducer,
  },
});

export default store;
