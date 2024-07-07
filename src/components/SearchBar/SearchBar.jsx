import { useState } from 'react';
import css from './SearchBar.module.css';

const SearchBar = ({ onSubmit, setSearchError }) => {
  const [searchInputValue, setSearchInputValue] = useState('');

  const handleInputChange = (event) => {
    setSearchInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchInputValue.trim()) {
      onSubmit(searchInputValue.trim());
      setSearchInputValue('');
    } else {
      setSearchError('Please enter a search term');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        className={css.inputFormSearchBar}
        type="text"
        name="searchInput"
        placeholder="Search images and photos"
        value={searchInputValue}
        onChange={handleInputChange}
      />
      <button className={css.buttonSearchBar} type="submit">Search</button>
    </form>
  );
};

export default SearchBar;

