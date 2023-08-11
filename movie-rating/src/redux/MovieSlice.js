import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export let getAllMovies = createAsyncThunk("Movie/getAllMovies", (state) => {
  return axios
    .get("http://localhost:8080/api/movies")
    .then((res) => res.data)
    .catch((err) =>{
      console.log(err);
      state.movies=[];
    } );
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
    builder.addCase(getAllMovies.pending, (state) => {
      console.log("pending");
      state.movies=[];
    });
    builder.addCase(getAllMovies.rejected, (state) => {
      console.log("Rejected");
      state.movies=[];
    });
  },
});
export default MovieSlice.reducer;