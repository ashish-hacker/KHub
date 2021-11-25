import React from 'react';
import axios from 'axios';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Button from '@mui/material/Button';

require('dotenv').config();

export default function DeletePost({ id }) {
  const handleDelete = async (e) => {
    e.preventDefault();
    const t = localStorage.getItem('jwt');
    try {
      await axios
        .delete(`${process.env.REACT_APP_BACKEND_ENDPOINT}/api/posts/delete/${id}`)
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
      // window.location.reload();
    } catch (err) {
      console.log(err);
    }
    window.location.reload();
    alert('Post Deleted Successfully');
  };
  return (
    <Button color="error">
      <DeleteOutlineIcon onClick={handleDelete} />
    </Button>
  );
}
