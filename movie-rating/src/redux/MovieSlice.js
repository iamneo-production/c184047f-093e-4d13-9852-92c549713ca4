import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export let getAllMovies = createAsyncThunk("Movie/getAllMovies", () => {
  return axios
    .get("http://localhost:8080/movies")
    .then((res) => res.data)
    .catch((err) => console.log(err));
});
const initialState = {
  movies: [],
  genreFilter: null
};

let MovieSlice = createSlice({
  name: "Movie",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAllMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    builder.addCase(getAllMovies.pending, () => {
      console.log("pending");
    });
    builder.addCase(getAllMovies.rejected, () => {
      console.log("rejected");
    });
  },
});
export default MovieSlice.reducer;