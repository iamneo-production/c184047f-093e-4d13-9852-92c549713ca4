import React from "react";
const SearchBox = ({ value, onChange }) => {
  return (
    <div style={{ width: "100%", marginLeft: "2px" }}>
    <input
      type="text"
      name="search"
      className="form-control my-3"
      onChange={onChange}
      value={value}
      placeholder="Search.."
    ></input>
    </div>
  );
};

export default SearchBox;