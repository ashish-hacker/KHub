import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Delete from './DeletePost';

export default function BasicCard({ row }) {
  const { _id, author, title, text, subject, votes } = row;
  const isAdmin = localStorage.getItem('is_admin') === 'true';
  const [vote, setVote] = useState(votes);

  const upvote = async () => {
    setVote(vote + 1);
    await axios.put(`${process.env.BACKEND_ENDPOINT}/api/posts/vote/${_id}`, {
      votes: vote + 1
    });
  };

  const downvote = async () => {
    setVote(vote - 1);
    await axios.put(`${process.env.BACKEND_ENDPOINT}/api/posts/vote/${_id}`, {
      votes: vote
    });
  };

  const Vote = () => (
    <Button onClick={upvote} style={{ color: 'red' }}>
      <FavoriteIcon />
      <Typography>{vote}</Typography>
    </Button>
  );

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {subject}
        </Typography>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          By -{author}
        </Typography>
        <Typography variant="body2">{text.slice(0, 100)}...</Typography>
      </CardContent>
      <CardActions alignItems="center">
        <Button sx={{ ml: 1.5 }}>
          <RouterLink
            to={{
              pathname: `/forum/post/${_id}`
            }}
            style={{ color: '#00A36C', textDecoration: 'none' }}
          >
            &nbsp; Read More &nbsp;
          </RouterLink>
        </Button>
        <Vote id={_id} />
        {isAdmin && <Delete id={_id} votes={votes} />}
      </CardActions>
    </Card>
  );
}
