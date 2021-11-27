import { React, useState } from 'react';
import PropTypes from 'prop-types';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Stack, Typography } from '@mui/material';
import authware from '../../../authware';

require('dotenv').config();

ChangeVote.propTypes = {
  fname: PropTypes.string,
  username: PropTypes.string,
  topicName: PropTypes.string,
  votes: PropTypes.string
};

export default function ChangeVote({ fname, username, topicName, votes }) {
  const [vote, setVote] = useState(parseInt(votes, 10));

  const upvote = async () => {
    setVote(vote + 1);
    const endpoint = `${process.env.REACT_APP_BACKEND_ENDPOINT}/api/hub/changeVotes`;
    const mode = 'post';
    const req = {
      filename: fname,
      name: username,
      topic: topicName,
      votes: vote
    };
    const res = await authware(mode, endpoint, req);
  };
  const downvote = async () => {
    setVote(vote - 1);
    const endpoint = `${process.env.REACT_APP_BACKEND_ENDPOINT}/api/hub/changeVotes`;
    const mode = 'post';
    const req = {
      filename: fname,
      name: username,
      topic: topicName,
      votes: vote
    };
    const res = await authware(mode, endpoint, req);
  };

  return (
    <Stack direction="column" alignItems="center" spacing={2}>
      <a style={{ color: 'black' }}>
        <ArrowDropUpIcon onClick={upvote} fontSize="large" />
      </a>
      <Typography>{vote}</Typography>
      <a style={{ color: 'black' }}>
        <ArrowDropDownIcon onClick={downvote} fontSize="large" />
      </a>
    </Stack>
  );
}
