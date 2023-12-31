import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/UserReducer";
import MovieReducer from "../redux/MovieSlice"

let store = configureStore({
  reducer: {
    user: userReducer,
    movie: MovieReducer,
  },
})
export default store;