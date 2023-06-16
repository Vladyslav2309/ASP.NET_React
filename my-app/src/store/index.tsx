import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import thunk from "redux-thunk";
import { AuthReducer } from "../components/auth/AuthReducer";


export const rootReduser=combineReducers({
  auth:AuthReducer
});

export const store=configureStore({
    reducer: rootReduser,
    devTools:true,
    middleware: [thunk]
})