import React from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonGroup, Box } from '@mui/material';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

function Pagination({ currentPage, totalPosts, postsPerPage, onPageChange }) {
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const getVisiblePageNumbers = () => {
    if (totalPages <= 7) {
      return createRange(1, totalPages);
    }

    if (currentPage <= 4) {
      return [...createRange(1, 5), '...', totalPages];
    }

    if (currentPage >= totalPages - 3) {
      return [1, '...', ...createRange(totalPages - 4, totalPages)];
    }

    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
  };

  const createRange = (start, end) => {
    return Array.from({ length: end - start + 1 }, (_, i) => i + start);
  };

  return (
    <Box display="flex" justifyContent="center" my={4}>
      <ButtonGroup variant="outlined" aria-label="pagination">
        <Button onClick={handlePrevious} disabled={currentPage === 1}>
          <NavigateBeforeIcon />
        </Button>
        {getVisiblePageNumbers().map((page, index) =>
          typeof page === 'number' ? (
            <Button
              key={page}
              onClick={() => onPageChange(page)}
              variant={currentPage === page ? 'contained' : 'outlined'}
            >
              {page}
            </Button>
          ) : (
            <Button key={`ellipsis-${index}`} disabled>
              {page}
            </Button>
          )
        )}
        <Button
          onClick={handleNext}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          <NavigateNextIcon />
        </Button>
      </ButtonGroup>
    </Box>
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPosts: PropTypes.number.isRequired,
  postsPerPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;