import { configureStore } from "@reduxjs/toolkit";
 import userReducer from "../redux/UserReducer";

let store = configureStore({
    reducer: {
         user: userReducer
    },
});
export default store;