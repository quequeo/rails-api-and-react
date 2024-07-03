import { useRef } from 'react';
import PropTypes from 'prop-types';

function SearchBar({ value, onDebounceChange, onImmediateChange }) {
  const searchDebounce = useRef(null);

  const handleSearchChange = (event) => {
    const searchValue = event.target.value;
    
    onImmediateChange(searchValue);

    clearTimeout(searchDebounce.current);
    searchDebounce.current = setTimeout(() => {
      onDebounceChange(searchValue);
    }, 500);
  }

  return (
    <input
      type="text"
      value={value}
      onChange={handleSearchChange}
      placeholder="Search..."
    />
  );
}

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onDebounceChange: PropTypes.func.isRequired,
  onImmediateChange: PropTypes.func.isRequired,
};

export default SearchBar;

