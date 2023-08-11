import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllMovies } from "../redux/MovieSlice";
import Movie from "./Movie"; // Assuming you have a MovieCard component
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./Sidebar";
import SearchBox from "./SearchBox";

function Movies() {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movie.movies);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(null);


  useEffect(() => {
    dispatch(getAllMovies());
  }, [dispatch]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setSelectedGenre(null); // Reset selectedGenre when searching
  }

  const handleFilterChange = (e) => {
    setSearchQuery("");      // Reset searchQuery when filtering
    setSelectedGenre(e.target.value); 
  }


  //searching
  const filteredBySearch = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  //filtering
  const filteredByGenre = (selectedGenre)
    ? filteredBySearch.filter((movie) => movie.genre === selectedGenre)
    : filteredBySearch;

  return (
    <div className="movies-page" style={{ backgroundColor: "rgba(0, 0, 0, 0.9)", width: "100%", minHeight: "100vh" }}>
  <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
    <div className="search-bar" style={{ display: "flex", alignItems: "center", width: "60%" }}>
      <Sidebar value={selectedGenre} onChange={handleFilterChange} />
      <SearchBox value={searchQuery} onChange={handleSearchChange} />
    </div>
  </div>
  {
    filteredByGenre.length === 0 ? 
    <div style={{ color: "white" ,width: "100%", fontSize: "30px"}}>No movies found. Please try a different search or genre.</div>
      : 
    <div style={{ display: "grid", margin: "30px", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "20px", justifyContent: "center" }}>
      {filteredByGenre.map((movie) => (<Movie key={movie.id} movie={movie} />))}
    </div>
  }
</div>

  );
}

export default Movies;


