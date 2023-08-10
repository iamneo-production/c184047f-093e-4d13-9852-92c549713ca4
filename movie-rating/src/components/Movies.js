import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllMovies } from "../redux/MovieSlice";
import Movie from "./Movie"; // Assuming you have a MovieCard component
import "bootstrap/dist/css/bootstrap.min.css";

function Movies() {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movie.movies);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(null);

  const genres = ["Action", "Thriller", "Comedy", "Drama", "Sci-Fi", "Adventure"];

  useEffect(() => {
    dispatch(getAllMovies());
  }, [dispatch]);

  const filteredBySearch = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredByGenre = selectedGenre
    ? filteredBySearch.filter((movie) => movie.genre === selectedGenre)
    : filteredBySearch;

  return (
    <div className="movies-page">
      <div className="search-bar" style={{ width: "80%", margin: "0 auto" }}>
        <input
          type="text"
          className="form-control my-3"
          placeholder="Search for movies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: "100%" }}
        />
      </div>
      <div className="sidebar">
        <h2>Genres</h2>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          <li
            className={!selectedGenre ? "active" : ""}
            onClick={() => setSelectedGenre(null)}
          >
            All
          </li>
          {genres.map((genre) => (
            <li
              key={genre}
              className={selectedGenre === genre ? "active" : ""}
              onClick={() => setSelectedGenre(genre)}
            >
              {genre}
            </li>
          ))}
        </ul>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {filteredByGenre.length === 0 ? (
          <p>No movies found. Please try a different search or genre.</p>
        ) : (
          filteredByGenre.map((movie) => (
            <Movie key={movie.id} movie={movie} />
          ))
        )}
      </div>
    </div>
  );
}

export default Movies;
