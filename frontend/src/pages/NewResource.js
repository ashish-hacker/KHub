import { useNavigate } from 'react-router-dom';
import { React, useState } from 'react';
// material
import { styled } from '@mui/material/styles';
import { Box, Stack, Container, Typography, TextField, LinearProgress } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// layouts
// import AuthLayout from '../layouts/AuthLayout';
// components
import axios from 'axios';
import Page from '../components/Page';
// import { MHidden } from '../components/@material-extend';
// import { LoginForm } from '../components/authentication/login';
// import AuthSocial from '../components/authentication/AuthSocial';

// const { BlobServiceClient } = require('@azure/storage-blob');

// ----------------------------------------------------------------------
require('dotenv').config();

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));
const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------
function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

export default function NewResc(votes) {
  const [file, setFile] = useState(null);
  const [author, setAuthor] = useState('');
  const [tag, setTags] = useState('');
  const navigate = useNavigate();
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    if (e.target.id === 'author') {
      setAuthor(e.target.value);
    } else if (e.target.id === 'tags') {
      setTags(e.target.value);
    } else if (e.target.id === 'file') {
      setFile(e.target.files[0]);
    }
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append('author', author);
    formData.append('topic', tag);
    formData.append('file', file);
    formData.append('is_admin', localStorage.getItem('is_admin'));
    formData.append('votes', votes);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_ENDPOINT}/api/hub/upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          onUploadProgress: (progressEvent) => {
            setUploadPercentage(
              parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total), 10)
            );
          }
        }
      );
      console.log(res);
    } catch (err) {
      console.log(err);
    }
    navigate('/hub', { replace: true });
    window.location.reload();
  };

  return (
    <RootStyle title="Add Resource">
      <Container maxWidth="sm">
        <ContentStyle>
          <Stack sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              Add Resource...
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>Add file.</Typography>
          </Stack>
          <Stack spacing={3}>
            <TextField id="author" label="Author" color="success" focused onChange={handleChange} />
            <TextField id="tags" label="Topic" color="success" focused onChange={handleChange} />
            <input id="file" type="file" onChange={handleChange} required />
            <LinearProgressWithLabel value={uploadPercentage} />
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
              onClick={handleFileUpload}
            >
              Add Resource
            </LoadingButton>
          </Stack>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
