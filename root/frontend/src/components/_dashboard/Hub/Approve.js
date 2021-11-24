import React from 'react';
import axios from 'axios';
import CheckIcon from '@mui/icons-material/Check';

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
      arr = arr.filter((item) => item.filename !== filename);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  return <CheckIcon onClick={handleApprove} style={{ hover: 'pointer' }} />;
}
