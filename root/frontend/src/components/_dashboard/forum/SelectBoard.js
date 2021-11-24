import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import ListSubheader from '@mui/material/ListSubheader';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectBoard({ setY, setB, setS }) {
  const [open, setOpen] = React.useState(false);
  const [year, setYear] = React.useState('');
  const [branch, setBranch] = React.useState('');
  const [subject, setSubject] = React.useState('');

  const handleChange = (e) => {
    if (e.target.name === 'year') {
      setYear(Number(e.target.value));
      setY(year);
    } else if (e.target.name === 'branch') {
      setBranch(e.target.value);
      setB(branch);
    } else if (e.target.name === 'subject') {
      setSubject(e.target.value);
      setS(subject);
    }
  };

  return (
    <div>
      <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-dialog-select-label">Year</InputLabel>
          <Select
            labelId="demo-dialog-select-label"
            id="demo-dialog-select"
            value={year}
            name="year"
            onChange={handleChange}
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
            value={branch}
            name="branch"
            onChange={handleChange}
            input={<OutlinedInput label="Branch" />}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="CSE">Computer Science and Engineering</MenuItem>
            <MenuItem value="ME">Mechanical Engineering</MenuItem>
            <MenuItem value="EE">Electrical Engineering</MenuItem>
            <MenuItem value="IT">Information Technology</MenuItem>
            <MenuItem value="CE">Civil Engineering</MenuItem>
            <MenuItem value="ECE">Electronics and Communication Engineering</MenuItem>
            <MenuItem value="EI">Electronics and Instrumation</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel htmlFor="grouped-select">Subject</InputLabel>
          <Select
            defaultValue=""
            id="grouped-select"
            label="Grouping"
            onChange={handleChange}
            name="subject"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <ListSubheader>Computer Science and Engineering</ListSubheader>
            <MenuItem value={1}>Operating Systems</MenuItem>
            <MenuItem value={2}>Advanced Algorithms</MenuItem>
            <ListSubheader>Mechanical Engineering</ListSubheader>
            <MenuItem value={3}>Subject 1</MenuItem>
            <MenuItem value={4}>Subject 2</MenuItem>
            <ListSubheader>Electrical Engineering</ListSubheader>
            <MenuItem value={3}>Subject 1</MenuItem>
            <MenuItem value={4}>Subject 2</MenuItem>
            <ListSubheader>Information Technology</ListSubheader>
            <MenuItem value={3}>Subject 1</MenuItem>
            <MenuItem value={4}>Subject 2</MenuItem>
            <ListSubheader>Civil Engineering</ListSubheader>
            <MenuItem value={3}>Subject 1</MenuItem>
            <MenuItem value={4}>Subject 2</MenuItem>
            <ListSubheader>Electronics and Communication Engineering</ListSubheader>
            <MenuItem value={3}>Subject 1</MenuItem>
            <MenuItem value={4}>Subject 2</MenuItem>
            <ListSubheader>Electronics and Instrumation</ListSubheader>
            <MenuItem value={3}>Subject 1</MenuItem>
            <MenuItem value={4}>Subject 2</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </div>
  );
}
