import React from 'react';

const Search = ({ value, onChange }) => {
    return (
      <input
        className="form-control my-3"
        type="text"
        name="query"
        value={value}
        placeholder="Search"
        onChange={(e) => onChange(e.currentTarget.value)}/>
    )
}

export default Search;
