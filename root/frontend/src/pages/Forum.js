import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import axios from 'axios';
// react
import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// material
import {
  Grid,
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
import SelectBoard from '../components/_dashboard/forum/SelectBoard';
import TableHead from '../components/_dashboard/Hub/FileListHead';
import Scrollbar from '../components/Scrollbar';
import getPosts from '../components/_dashboard/forum/getPosts';
import searchPosts from '../components/_dashboard/forum/searchPost';
import Post from './AddPost';
import ShowPost from './Post';
// import { BlogPostCard, BlogPostsSort, BlogPostsSearch } from '../components/_dashboard/forum';
//
// import POSTS from '../_mocks_/blog';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Author', alignRight: false },
  { id: 'Title', label: 'Title', alignRight: false },
  { id: 'Related Subject', label: 'Topic', alignRight: false },
  { id: 'Upload Date', label: 'Uploaded on', alignRight: false },
  { id: 'Votes', label: 'Votes', alignRight: false }
];
// ----------------------------------------------------------------------
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

function Title({ title, id, author, text, comments }) {
  const handleNav = () => <ShowPost />;
  return (
    <Typography variant="subtitle2" noWrap>
      <a href="/forum/app" onClick={handleNav} style={{ textDecoration: 'none', color: 'green' }}>
        {title}
      </a>
    </Typography>
  );
}

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
  const handleSearch = async () => {
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
          <SelectBoard setB={setBranch} setY={setYear} setS={setSubject} />
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
                      const { _id, author, title, subject, creationDate, votes, comments, text } =
                        row;
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
              </Table>
            </TableContainer>
          </Scrollbar>
        </Card>
      </Container>
    </Page>
  );
}
