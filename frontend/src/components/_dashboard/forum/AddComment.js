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

export default function AddPost({ id }) {
  const [open, setOpen] = React.useState(false);
  const [textContent, setText] = React.useState('');
  const [authorName, setAuthor] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleChange = (e) => {
    const val = e.target.value;
    const nam = e.target.name;
    if (nam === 'author') {
      setAuthor(val);
    } else if (nam === 'text') {
      setText(val);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const reqBody = {
      author: authorName,
      comment: textContent
    };
    await axios
      .put(`/api/posts/comment/${id}`, reqBody)
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
      <Button onClick={handleClickOpen}>Add Comment</Button>
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>Fill Post Details</DialogTitle>
        <DialogContent>
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
              Add Comment
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
