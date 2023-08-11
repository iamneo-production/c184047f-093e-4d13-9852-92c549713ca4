import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setGenreFilter } from "../redux/MovieSlice";

const genres = [
    "All",
  "Action",
  "Thriller",
  "Comedy",
  "Drama",
  "Sci-Fi",
  "Adventure",
];
const selectedItem = "All";

function Sidebar() {
  const dispatch = useDispatch();
  const genreFilter = useSelector((state) => state.movie.genreFilter);

 
  const onClick = ()=>{

  }

  return (
    <React.Fragment>
        <ul className="list-group">
          {genres.map((item) => (
            <li
              key={item}
              className={`list-group-item${
                item === selectedItem ? " active" : ""
              }`}
              onClick={() => onClick(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      </React.Fragment>
  );
}

export default Sidebar;


