import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setGenreFilter } from "../redux/MovieSlice";

const genres = [
  "Action",
  "Thriller",
  "Comedy",
  "Drama",
  "Sci-Fi",
  "Adventure",
];

function Sidebar() {
  const dispatch = useDispatch();
  const genreFilter = useSelector((state) => state.movie.genreFilter);

  const handleFilterChange = (genre) => {
    dispatch(setGenreFilter(genre));
  };

  return (
    <div className="sidebar">
      <h2>Genres</h2>
      <ul>
        <li
          className={genreFilter === null ? "active" : ""}
          onClick={() => handleFilterChange(null)}
        >
          All
        </li>
        {genres.map((genre) => (
          <li
            key={genre}
            className={genreFilter === genre ? "active" : ""}
            onClick={() => handleFilterChange(genre)}
          >
            {genre}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
