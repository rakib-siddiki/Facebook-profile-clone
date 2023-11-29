import { configureStore } from "@reduxjs/toolkit";
import userLoginReducer from "./userLoginInfoSlice";
import thunk from "redux-thunk";

export const store = configureStore({
  reducer: { userLoginReducer },
  middleware:[thunk]
});
