import { React, useState } from 'react';
import PropTypes from 'prop-types';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Stack, Typography } from '@mui/material';
import authware from '../../../authware';

ChangeVote.propTypes = {
  fname: PropTypes.string,
  username: PropTypes.string,
  topicName: PropTypes.string,
  votes: PropTypes.string
};

export default function ChangeVote({ fname, username, topicName, votes }) {
  const [vote, setVote] = useState(parseInt(votes, 10));

  const upvote = async () => {
    const endpoint = `${process.env.REACT_APP_BACKEND_ENDPOINT}/api/hub/changeVotes`;
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
    const endpoint = `${process.env.REACT_APP_BACKEND_ENDPOINT}/api/hub/changeVotes`;
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
      <a href="#" style={{ color: 'black' }}>
        <ArrowDropUpIcon onClick={upvote} fontSize="large" />
      </a>
      <Typography>{vote}</Typography>
      <a href="#" style={{ color: 'black' }}>
        <ArrowDropDownIcon onClick={downvote} fontSize="large" />
      </a>
    </Stack>
  );
}
