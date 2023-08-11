import React from "react";
const Sidebar = ({ value, onChange}) => {
  const genres = ["Action", "Thriller", "Comedy", "Drama", "Sci-Fi", "Adventure"];
  return (
    <div className="sidebar">
        <select
            className="form-select"
            value={value || ""}
            onChange={onChange}
        >
        <option value="">All</option>
        {genres.map((genre) => (
        <option key={genre} value={genre}>
            {genre}
        </option>
        ))}
        </select>
    </div>
  );
};

export default Sidebar;