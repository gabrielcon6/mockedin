import React, { useState, useEffect } from 'react';

import '../../places/pages/PlaceForm.css';


const SearchBox = (props) => {
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
  props.filterUsers(searchInput)}, [searchInput]
  )

  let onChangeHandler = (e) => {
    setSearchInput(e.target.value);
  }

  return (
    <div >
      <input
        aria-label="Search"
        className="place-form center"
        type='search'
        placeholder='search users'
        onChange={onChangeHandler}
      />
    </div>
  );
}

export default SearchBox;