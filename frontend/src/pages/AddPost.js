//  react
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import ListSubheader from '@mui/material/ListSubheader';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import { LoadingButton } from '@mui/lab';
import { Stack } from '@mui/material';
import axios from 'axios';
import Branches from '../data/branches';
import Subjects from '../data/subjects';

require('dotenv').config();

export default function AddPost() {
  const [open, setOpen] = React.useState(false);
  const [yearN, setYear] = React.useState('');
  const [branchName, setBranch] = React.useState('');
  const [subjectName, setSubject] = React.useState('');
  const [textContent, setText] = React.useState('');
  const [authorName, setAuthor] = React.useState('');
  const [topicN, setTopic] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleChange = (e) => {
    const val = e.target.value;
    const nam = e.target.name;
    if (nam === 'year') {
      setYear(val);
    } else if (nam === 'branch') {
      setBranch(val);
    } else if (nam === 'subject') {
      setSubject(val);
    } else if (nam === 'author') {
      setAuthor(val);
    } else if (nam === 'topic') {
      setTopic(val);
    } else if (nam === 'text') {
      setText(val);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const reqBody = {
      author: authorName,
      branch: branchName,
      subject: subjectName,
      text: textContent,
      year: yearN,
      title: topicN
    };
    await axios
      .post(`${process.env.REACT_APP_BACKEND_ENDPOINT}/api/posts`, reqBody)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    setIsSubmitting(false);
    setOpen(false);
    window.location.reload();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>Add Post</Button>
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>Fill Post Details</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-dialog-select-label">Year</InputLabel>
              <Select
                labelId="demo-dialog-select-label"
                id="demo-dialog-select"
                value={yearN}
                onChange={handleChange}
                name="year"
                input={<OutlinedInput label="Age" />}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={1}>1st Year</MenuItem>
                <MenuItem value={2}>2nd Year</MenuItem>
                <MenuItem value={3}>3rd Year</MenuItem>
                <MenuItem value={4}>4th Year</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-dialog-select-label">Branch</InputLabel>
              <Select
                labelId="demo-dialog-select-label"
                id="demo-dialog-select"
                value={branchName}
                onChange={handleChange}
                name="branch"
                input={<OutlinedInput label="Age" />}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {Branches.map((branch) => (
                  <MenuItem value={branch}>{branch}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel htmlFor="grouped-select">Subject</InputLabel>
              <Select
                defaultValue=""
                id="grouped-select"
                label="Grouping"
                value={subjectName}
                onChange={handleChange}
                name="subject"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {Subjects[branchName].map((subject) => (
                  <MenuItem value={subject}>{subject}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box
            component="form"
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              '& > :not(style)': { m: 1, width: '25ch' }
            }}
            spacing={2}
          >
            <TextField
              id="outlined-basic"
              label="Name"
              value={authorName}
              name="author"
              variant="outlined"
              onChange={handleChange}
            />
            <TextField
              id="outlined-basic"
              label="Topic"
              value={topicN}
              name="topic"
              variant="outlined"
              onChange={handleChange}
            />
          </Box>
          <Stack direction="column" spacing={2}>
            <TextField
              id="outlined-multiline-flexible"
              label="Content"
              multiline
              maxRows={10}
              value={textContent}
              name="text"
              onChange={handleChange}
            />
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
              onClick={handleSubmit}
            >
              Add Post
            </LoadingButton>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
