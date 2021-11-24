import React from 'react';
import axios from 'axios';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export default function DeletePost({ id, posts }) {
  const handleDelete = async (e) => {
    e.preventDefault();
    const t = localStorage.getItem('jwt');
    try {
      await axios
        .delete(`/api/posts/delete/${id}`)
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
      // window.location.reload();
    } catch (err) {
      console.log(err);
    }
    window.location.reload();
    alert('Post Deleted Successfully');
  };
  return <DeleteOutlineIcon onClick={handleDelete} />;
}
