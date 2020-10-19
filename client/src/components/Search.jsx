import React from "react";

const Search = ({ searchTerm, setSearchTerm }) => {
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="search-container">
      <label htmlFor="search">
        <h4>Search by name:</h4>
      </label>
      <br />
      <input
        type="text"
        id="search"
        className="form-control"
        value={searchTerm}
        onChange={(e) => handleChange(e)}
      />
    </div>
  );
};

export default Search;
