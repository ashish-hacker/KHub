import React from 'react';
import axios from 'axios';
import ClearIcon from '@mui/icons-material/Clear';

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

  return <ClearIcon onClick={handleDisApprove} />;
}
