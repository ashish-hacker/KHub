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
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
// components
import Page from '../components/Page';
import Delete from '../components/_dashboard/forum/DeletePost';
// import SelectBoard from '../components/_dashboard/forum/SelectBoard';
import TableHead from '../components/_dashboard/Hub/FileListHead';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import getPosts from '../components/_dashboard/forum/getPosts';
import searchPosts from '../components/_dashboard/forum/searchPost';
import Post from './AddPost';
// import { BlogPostCard, BlogPostsSort, BlogPostsSearch } from '../components/_dashboard/forum';
//
// import POSTS from '../_mocks_/blog';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Author', alignRight: false },
  { id: 'Title', label: 'Title', alignRight: false },
  { id: 'Related Subject', label: 'Subject', alignRight: false },
  { id: 'Upload Date', label: 'Uploaded on', alignRight: false },
  { id: 'Votes', label: 'Votes', alignRight: false }
];
// ----------------------------------------------------------------------
Vote.propTypes = {
  votes: PropTypes.number,
  id: PropTypes.string
};

function Vote({ votes, id }) {
  const [vote, setVote] = useState(votes);

  const upvote = async () => {
    setVote(vote + 1);
    await axios.put(`/api/posts/vote/${id}`, {
      votes: vote
    });
  };
  const downvote = async () => {
    setVote(vote - 1);
    await axios.put(`/api/posts/vote/${id}`, {
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
        .post('/api/forum/access', {
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
              <MenuItem value="Computer Science and Engineering">
                Computer Science and Engineering
              </MenuItem>
              <MenuItem value="Mechanical Engineering">Mechanical Engineering</MenuItem>
              <MenuItem value="Electrical Engineering">Electrical Engineering</MenuItem>
              <MenuItem value="Information Technology">Information Technology</MenuItem>
              <MenuItem value="Civil Engineering">Civil Engineering</MenuItem>
              <MenuItem value="Electronics and Communication Engineering">
                Electronics and Communication Engineering
              </MenuItem>
              <MenuItem value="Electronics and Instrumation">Electronics and Instrumation</MenuItem>
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
              <ListSubheader>Computer Science and Engineering</ListSubheader>
              <MenuItem value="Operating Systems">Operating Systems</MenuItem>
              <MenuItem value="Advanced Algorithms">Advanced Algorithms</MenuItem>
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
  const handleSearch = async () => {
    console.log(year, branch, subject);
    const res = await searchPosts(branch, year, subject);
    setPosts(res);
    setLoading(false);
  };

  return (
    <Page title="Forum">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Forum
          </Typography>
          <Post />
        </Stack>

        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <SelectBoard />
          <Button variant="contained" onClick={handleSearch}>
            Search
          </Button>
        </Stack>
        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 500 }}>
              <Table>
                <TableHead headLabel={TABLE_HEAD} />
                <TableBody>
                  {!posts ? (
                    <CircularProgress />
                  ) : (
                    posts.map((row) => {
                      const { _id, author, title, subject, year, creationDate, votes } = row;
                      return (
                        <TableRow hover key={_id} tabIndex={-1}>
                          <TableCell align="left">
                            <Typography variant="subtitle2" noWrap>
                              {author}
                            </Typography>
                          </TableCell>
                          <TableCell align="left">
                            <RouterLink
                              to={{
                                pathname: `/forum/post/${_id}`
                              }}
                              style={{ color: 'black' }}
                            >
                              {title}
                            </RouterLink>
                          </TableCell>
                          <TableCell align="left">
                            <Typography variant="subtitle2" noWrap>
                              {subject}
                            </Typography>
                          </TableCell>
                          <TableCell align="left">
                            <Typography variant="subtitle2" noWrap>
                              {creationDate}
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Vote votes={votes} id={_id} />
                          </TableCell>
                          {isAdmin && (
                            <TableCell align="right">
                              <Delete id={_id} posts={posts} />
                            </TableCell>
                          )}
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
                {loading && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <CircularProgress />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
                {posts && posts.length === 0 && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Typography>
                          No results found for Branch: {branch} Year: {year} Subject: {subject}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>
        </Card>
      </Container>
    </Page>
  );
}
