import { React, useState } from 'react';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Stack, Typography } from '@mui/material';
import authware from '../../../authware';

export default function ChangeVote({ fname, username, topicName, votes }) {
  const [vote, setVote] = useState(parseInt(votes, 10));

  const upvote = async (e) => {
    const endpoint = '/api/hub/changeVotes';
    const mode = 'post';
    const req = {
      filename: fname,
      name: username,
      topic: topicName,
      votes: vote
    };
    const res = await authware(mode, endpoint, req);
    setVote(vote + 1);
  };
  const downvote = async () => {
    const endpoint = '/api/hub/changeVotes';
    const mode = 'post';
    const req = {
      filename: fname,
      name: username,
      topic: topicName,
      votes: vote
    };
    const res = await authware(mode, endpoint, req);
    setVote(vote - 1);
  };

  return (
    <Stack direction="column" alignItems="center" spacing={2}>
      <ArrowDropUpIcon onClick={upvote} fontSize="large" style={{ ':hover': 'pointer' }} />
      <Typography>{vote}</Typography>
      <ArrowDropDownIcon onClick={downvote} fontSize="large" />
    </Stack>
  );
}
