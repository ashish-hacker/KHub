import React from 'react';
import axios from 'axios';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

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
    const a = arr.filter((item) => item.filename !== filename);
    window.location.reload();
    alert('Deleted Successfully');
  };
  return <DeleteOutlineIcon onClick={handleDelete} />;
}
