import { configureStore } from "@reduxjs/toolkit";
import MovieReducer from "../redux/MovieSlice"


let store = configureStore({
  reducer: {
    movie: MovieReducer,
  },
});
export default store;