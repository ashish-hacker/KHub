import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import ClearIcon from '@mui/icons-material/Clear';
import Button from '@mui/material/Button';

DisApprove.propTypes = {
  filename: PropTypes.string
};

export default function DisApprove({ filename }) {
  const handleDisApprove = async (e) => {
    e.preventDefault();
    const t = localStorage.getItem('jwt');
    try {
      await axios
        .delete(`/api/hub/deleteReview?name=${filename}`, {
          token: t
        })
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Button color="error">
      <ClearIcon onClick={handleDisApprove} />
    </Button>
  );
}
