import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import CheckIcon from '@mui/icons-material/Check';
import Button from '@mui/material/Button';

Approve.propTypes = {
  filename: PropTypes.string,
  arr: PropTypes.array
};

export default function Approve({ filename, arr }) {
  const handleApprove = async (e) => {
    e.preventDefault();
    const tok = {
      token: localStorage.getItem('jwt')
    };
    try {
      await axios
        .post(`${process.env.REACT_APP_BACKEND_ENDPOINT}/api/hub/move`, {
          token: tok,
          name: filename
        })
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Button>
      <CheckIcon onClick={handleApprove} style={{ hover: 'pointer' }} />
    </Button>
  );
}
