import React from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';

export default function DownloadFromMain({ filename }) {
  const handleDownload = async (e) => {
    e.preventDefault();
    try {
      const tok = {
        token: localStorage.getItem('jwt')
      };
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_ENDPOINT}/api/hub/download?name=${filename}`,
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
  return <Button onClick={handleDownload}>{filename}</Button>;
}
