import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

Delete.propTypes = {
  filename: PropTypes.string,
  arr: PropTypes.array
};

export default function Delete({ filename, arr }) {
  const handleDelete = async (e) => {
    e.preventDefault();
    const t = localStorage.getItem('jwt');
    try {
      await axios
        .delete(`/api/hub/delete?name=${filename}&token=${t}`)
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
      // window.location.reload();
    } catch (err) {
      console.log(err);
    }
    window.location.reload();
    alert('Deleted Successfully');
  };
  return <DeleteOutlineIcon onClick={handleDelete} />;
}
