import authReducer from "store/slices/auth";
import usersReducer from "store/slices/users";
import slidesReducer from "store/slices/slides";
import productsReducer from "store/slices/products";
import { combineReducers } from "@reduxjs/toolkit";

export default combineReducers({
  products: productsReducer,
  users: usersReducer,
  auth: authReducer,
  slides: slidesReducer,
});
