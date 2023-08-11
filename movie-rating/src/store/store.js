import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/UserReducer";

let store = configureStore({
    reducer: {
         user: userReducer,
         movie: MovieReducer,
    },

export default store;