import axios from 'axios';
import PropTypes from 'prop-types';
// react
import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// material
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import ListSubheader from '@mui/material/ListSubheader';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {
  Button,
  Container,
  Stack,
  TableRow,
  TableBody,
  TableCell,
  Typography,
  Card,
  TableContainer,
  Table,
  CircularProgress
} from '@mui/material';
import Grid from '@mui/material/Grid';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
// components
import Page from '../components/Page';
import PostCard from '../components/_dashboard/forum/PostCard';
import Delete from '../components/_dashboard/forum/DeletePost';
// import SelectBoard from '../components/_dashboard/forum/SelectBoard';
import TableHead from '../components/_dashboard/Hub/FileListHead';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import getPosts from '../components/_dashboard/forum/getPosts';
import searchPosts from '../components/_dashboard/forum/searchPost';
import Post from './AddPost';
import Branches from '../data/branches';
import Subjects from '../data/subjects';
// import { BlogPostCard, BlogPostsSort, BlogPostsSearch } from '../components/_dashboard/forum';
//
// import POSTS from '../_mocks_/blog';
require('dotenv').config();
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
Vote.propTypes = {
  votes: PropTypes.number,
  id: PropTypes.string
};

function Vote({ votes, id }) {
  const [vote, setVote] = useState(votes);

  const upvote = async () => {
    setVote(vote + 1);
    await axios.put(`${process.env.REACT_APP_BACKEND_ENDPOINT}/api/posts/vote/${id}`, {
      votes: vote
    });
  };
  const downvote = async () => {
    setVote(vote - 1);
    await axios.put(`${process.env.REACT_APP_BACKEND_ENDPOINT}/api/posts/vote/${id}`, {
      votes: vote
    });
  };

  return (
    <Stack direction="column" alignItems="center" spacing={2}>
      <ArrowDropUpIcon onClick={upvote} fontSize="large" style={{ ':hover': 'pointer' }} />
      <Typography>{vote}</Typography>
      <ArrowDropDownIcon onClick={downvote} fontSize="large" />
    </Stack>
  );
}
// function Title({ title, id, author, text, comments }) {
//   const handleNav = () => <ShowPost />;
//   return (
//     <Typography variant="subtitle2" noWrap>
//       <a href="/forum/app" onClick={handleNav} style={{ textDecoration: 'none', color: 'green' }}>
//         {title}
//       </a>
//     </Typography>
//   );
// }

export default function Board() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [branch, setBranch] = useState('');
  const [year, setYear] = useState('');
  const [subject, setSubject] = useState('');
  const [loading, setLoading] = useState(true);
  const isAdmin = localStorage.getItem('is_admin') === 'true';

  useEffect(async () => {
    const res = await getPosts();
    setPosts(res);
    setLoading(false);
  }, []);

  useEffect(() => {
    try {
      axios
        .post(`${process.env.REACT_APP_BACKEND_ENDPOINT}/api/forum/access`, {
          token: localStorage.getItem('jwt')
        })
        .then((res) => {
          if (res.status !== 200) {
            navigate('/login', {
              replace: true
            });
          }
        })
        .catch((err) => {
          console.log(err);
          navigate('/login', {
            replace: true
          });
        });
    } catch (err) {
      console.log(err);
      navigate('/login', {
        replace: true
      });
    }
  }, []);

  function SelectBoard() {
    const handleChange = (e) => {
      if (e.target.name === 'year') {
        setYear(Number(e.target.value));
      } else if (e.target.name === 'branch') {
        setBranch(e.target.value);
      } else if (e.target.name === 'subject') {
        setSubject(e.target.value);
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
              value={subject}
              onChange={handleChange}
              name="subject"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {Subjects[branch].map((subject) => (
                <MenuItem value={subject}>{subject}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </div>
    );
  }
  const handleSearch = async () => {
    const res = await searchPosts(branch, year, subject);
    setPosts(res);
    setLoading(false);
  };

  return (
    <Page title="Forum">
      <Container>
        <Stack direction="row" align="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Forum
          </Typography>
          <Post />
        </Stack>

        <Stack mb={5} direction="row" align="center" justifyContent="space-between">
          <SelectBoard />
          <Button variant="outlined" onClick={handleSearch}>
            Search
          </Button>
        </Stack>
        <Container align="center">
          {loading && <CircularProgress />}
          <Container align="center" sx={{ minWidth: 500 }}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
              {!posts ? (
                <Typography>No Posts Found!</Typography>
              ) : (
                posts.map((row) => (
                  <Grid item xs={2} sm={4} md={4} key={row._id}>
                    <PostCard row={row} />
                  </Grid>
                ))
              )}
              {posts.length === 0 && !loading && (
                <Container align="center">
                  <SearchNotFound searchQuery="Your Query" forum="true" />
                </Container>
              )}
            </Grid>
          </Container>
        </Container>
      </Container>
    </Page>
  );
}
