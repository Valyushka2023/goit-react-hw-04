import React, { useState, ChangeEvent, FormEvent } from 'react';
import css from './SearchBar.module.css';


interface SearchBarProps {
  onSubmit: (searchTerm: string) => void;
  setSearchError: (error: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSubmit, setSearchError }) => {
  const [searchInputValue, setSearchInputValue] = useState<string>('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
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