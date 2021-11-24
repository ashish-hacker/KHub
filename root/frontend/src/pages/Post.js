//  react
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
// material
import { Box, Grid, Container, Typography, CircularProgress } from '@mui/material';
import axios from 'axios';
// components
import Page from '../components/Page';
import AddComment from '../components/_dashboard/forum/AddComment';
// ----------------------------------------------------------------------

export default function Post() {
  const location = useLocation();
  const [comments, setComments] = useState([]);
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const id = location.pathname.split('/')[3];
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    const res = await axios.get(`/api/posts/searchOne?id=${id}`);
    setAuthor(res.data.author);
    setTitle(res.data.title);
    setText(res.data.text);
    setComments(res.data.comments);
    setLoading(false);
  }, []);
  // { id , author, creationDate, title, text, comments }
  return (
    <Page title="Home">
      {loading && (
        <Container alignItems="center">
          <CircularProgress />
        </Container>
      )}
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }} alignItems="center">
          <Typography variant="h4">{title}</Typography>
          <i>By {author}</i>
        </Box>
        <Box sx={{ pb: 10 }} alignItems="center">
          <Typography>{text}</Typography>
        </Box>
        <Typography variant="h5">Comments:</Typography>
        <Box sx={{ mt: 2 }} alignItems="center">
          <ul style={{ listStyleType: 'none' }}>
            {comments.map((text) => (
              <li>
                <h4>{text.author}:</h4>
                {text.comment}
              </li>
            ))}
          </ul>
        </Box>
        <AddComment id={id} />
      </Container>
    </Page>
  );
}
