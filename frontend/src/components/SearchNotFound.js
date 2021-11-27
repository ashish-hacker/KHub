import PropTypes from 'prop-types';
// material
import { Paper, Typography } from '@mui/material';

// ----------------------------------------------------------------------

SearchNotFound.propTypes = {
  searchQuery: PropTypes.string,
  forum: PropTypes.bool
};

export default function SearchNotFound({ searchQuery = '', forum = false, ...other }) {
  return (
    <Paper {...other}>
      <Typography gutterBottom align="center" variant="subtitle1">
        Not found
      </Typography>
      {!forum && (
        <Typography variant="body2" align="center">
          No results found for &nbsp;
          <strong>&quot;{searchQuery}&quot;</strong>. Try checking for typos or using complete
          words.
        </Typography>
      )}
    </Paper>
  );
}
