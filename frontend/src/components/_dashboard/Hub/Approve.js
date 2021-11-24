import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import CheckIcon from '@mui/icons-material/Check';

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
        .post('/api/hub/move', {
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
  return <CheckIcon onClick={handleApprove} style={{ hover: 'pointer' }} />;
}
