import { useRef } from 'react';
import PropTypes from 'prop-types';
import { InputAdornment, TextField, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

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

  const handleClear = () => {
    onImmediateChange('');
    onDebounceChange('');
  };

  return (
    <TextField
      fullWidth
      variant="outlined"
      value={value}
      onChange={handleSearchChange}
      placeholder="Search posts..."
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon color="action" />
          </InputAdornment>
        ),
        endAdornment: value && (
          <InputAdornment position="end">
            <IconButton onClick={handleClear} edge="end" size="small">
              <ClearIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
      sx={{
        mb: 2,
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'rgba(0, 0, 0, 0.23)',
          },
          '&:hover fieldset': {
            borderColor: 'rgba(0, 0, 0, 0.87)',
          },
          '&.Mui-focused fieldset': {
            borderColor: 'primary.main',
          },
        },
      }}
    />
  );
}
SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onDebounceChange: PropTypes.func.isRequired,
  onImmediateChange: PropTypes.func.isRequired,
};

export default SearchBar;

