import React from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';

require('dotenv').config();

export default function DownloadFromTemp({ filename }) {
  const handleDownloadTemp = async (e) => {
    e.preventDefault();
    try {
      const tok = {
        token: localStorage.getItem('jwt')
      };
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_ENDPOINT}/api/hub/downloadTemp?name=${filename}`,
        tok
      );
      const url = res.data;
      const a = document.createElement('a');
      a.setAttribute('download', filename);
      a.setAttribute('href', url);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (err) {
      console.log(err);
    }
  };
  return <Button onClick={handleDownloadTemp}>{filename}</Button>;
}
