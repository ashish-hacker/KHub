import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import faker from 'faker';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  CircularProgress
} from '@mui/material';
// components
import { fi } from 'date-fns/locale';
import getList from '../_mocks_/user';
import httpReq from '../authware';
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import FilteredUsersHead from '../components/_dashboard/Hub/FileListHead';
import DownloadFromTemp from '../components/_dashboard/Hub/DownloadFromTemp';
import DownloadFromMain from '../components/_dashboard/Hub/DownloadFromMain';
import FilteredUsersToolbar from '../components/_dashboard/Hub/FileListToolbar';
import Delete from '../components/_dashboard/Hub/Delete';
import Approve from '../components/_dashboard/Hub/Approve';
import DisApprove from '../components/_dashboard/Hub/DisApprove';
import ChangeVote from '../components/_dashboard/Hub/ChangeVote';
// utils
import { mockImgAvatar } from '../utils/mockImages';
//

// ----------------------------------------------------------------------

const TABLE_HEAD_REV = [
  { id: 'name', label: 'Uploader', alignRight: false },
  { id: 'File Name', label: 'File', alignRight: false },
  { id: 'Related Subject', label: 'Topic', alignRight: false },
  { id: 'Upload Date', label: 'Uploaded on', alignRight: false },
  { id: 'Approve', label: 'Approve', alignRight: false },
  { id: 'Disapprove', label: 'Disapprove', alignRight: false }
];
const TABLE_HEAD = [
  { id: 'name', label: 'Uploader', alignRight: false },
  { id: 'File Name', label: 'File', alignRight: false },
  { id: 'Related Subject', label: 'Topic', alignRight: false },
  { id: 'Upload Date', label: 'Uploaded on', alignRight: false },
  { id: 'votes', label: 'Votes', alignRight: false }
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// apply filters on table with the query provided
function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function User() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('lastModified');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(1);
  const navigate = useNavigate();
  const [filteredUsers, setFilters] = useState([]);
  const [inReviewFiles, setInReviewFiles] = useState([]);
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredUsers.length) : 0;
  const isUserNotFound = filteredUsers.length === 0 && !loading;
  const isAdmin = localStorage.getItem('is_admin') === 'true';

  useEffect(async () => {
    try {
      await axios
        .post(`${process.env.BACKEND_ENDPOINT}/api/hub/access`, {
          token: localStorage.getItem('jwt')
        })
        .then((res) => {
          if (res.status !== 200) {
            navigate('/login', {
              replace: true
            });
            console.log(res);
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

  useEffect(async () => {
    const res = await getList();
    setFilters(res);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!isAdmin) {
      return;
    }
    const mode = 'get';
    const endpoint = `${process.env.BACKEND_ENDPOINT}/api/hub/listReview`;
    const reqBody = {
      token: ''
    };
    const reviewFiles = httpReq(mode, endpoint, reqBody);
    const blobs = [];
    try {
      reviewFiles.then((res) => {
        res.map((blob) => {
          blobs.push({
            id: faker.datatype.uuid(),
            avatarUrl: mockImgAvatar(parseInt(Math.random() * 10, 10)),
            name: blob.metadata.author,
            topic: blob.metadata.topic,
            lastModified: new Date(blob.blobData.properties.lastModified)
              .toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              })
              .replace(/ /g, '-'),
            filename: blob.blobData.name
          });
          return true;
        });
      });
      setInReviewFiles(blobs);
    } catch (err) {
      console.log(err);
    }
    console.log(inReviewFiles);
  }, []);

  const handleRequestSort = (event, property) => {
    console.log('handle');
  };
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = filteredUsers.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (e) => {
    setFilterName(e.target.value);
  };

  const sendQuery = async () => {
    try {
      await axios
        .post(`${process.env.BACKEND_ENDPOINT}/api/hub/search`, {
          q: filterName,
          top: 20,
          skip: 0,
          filters: []
        })
        .then((res) => {
          setFilters(res.data.results);
          // console.log(filteredUsers);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Page title="Resource Hub">
      {isAdmin && inReviewFiles && inReviewFiles.length !== 0 && (
        <Container gutterBottom>
          <Typography variant="h4" gutterBottom>
            Review These Resources
          </Typography>
          <Card gutterBottom>
            <Scrollbar>
              <TableContainer sx={{ minWidth: 800 }}>
                <Table>
                  <FilteredUsersHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD_REV}
                    rowCount={filteredUsers ? filteredUsers.length : 0}
                    numSelected={selected.length}
                    onRequestSort={handleRequestSort}
                    onSelectAllClick={handleSelectAllClick}
                  />
                  <TableBody>
                    {inReviewFiles
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row) => {
                        const { id, name, filename, avatarUrl, lastModified, topic } = row;
                        const isItemSelected = selected.indexOf(name) !== -1;

                        return (
                          <TableRow
                            hover
                            key={id}
                            tabIndex={-1}
                            role="option"
                            selected={isItemSelected}
                            aria-checked={isItemSelected}
                          >
                            <TableCell component="th" scope="row" padding="none">
                              <Stack direction="row" alignItems="center" spacing={2}>
                                <Typography>&nbsp;</Typography>
                                <Avatar alt="" src={avatarUrl} />
                                <Typography variant="subtitle2" noWrap>
                                  {name}
                                </Typography>
                              </Stack>
                            </TableCell>
                            <TableCell variant="subtitle3" align="left">
                              <DownloadFromTemp filename={filename} />
                            </TableCell>
                            <TableCell align="left">{topic}</TableCell>
                            <TableCell align="left"> {lastModified} </TableCell>
                            <TableCell align="left">
                              <Approve
                                filename={filename}
                                arr={inReviewFiles}
                                style={{ hover: 'pointer' }}
                              />
                            </TableCell>
                            <TableCell align="left">
                              <DisApprove filename={filename} style={{ hover: 'pointer' }} />
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Scrollbar>
          </Card>
          <Typography variant="h4" gutterBottom>
            &nbsp;
          </Typography>
        </Container>
      )}

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Resources
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/hub/newRsc"
            startIcon={<Icon icon={plusFill} />}
          >
            New Resource
          </Button>
        </Stack>

        <Card>
          <FilteredUsersToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleSearchChange}
            handleClick={sendQuery}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <FilteredUsersHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={filteredUsers ? filteredUsers.length : 0}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers &&
                    filteredUsers
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row) => {
                        const { id, name, filename, lastModified, avatarUrl, topic, votes } = row;

                        return (
                          <TableRow hover key={id} tabIndex={-1}>
                            <TableCell component="th" scope="row" padding="none">
                              <Stack direction="row" alignItems="center" spacing={2}>
                                <Typography>&nbsp;</Typography>
                                <Avatar padding="same" align="center" alt="" src={avatarUrl} />
                                <Typography variant="subtitle2" noWrap>
                                  {name}
                                </Typography>
                              </Stack>
                            </TableCell>
                            <TableCell align="left">
                              <DownloadFromMain filename={filename} />
                            </TableCell>
                            <TableCell align="left">{topic}</TableCell>
                            <TableCell align="left"> {lastModified} </TableCell>
                            <TableCell component="th" scope="row" padding="none">
                              <ChangeVote
                                username={name}
                                fname={filename}
                                topicName={topic}
                                votes={votes}
                              />
                            </TableCell>
                            {isAdmin && (
                              <TableCell align="right">
                                <Delete filename={filename} arr={filteredUsers} />
                              </TableCell>
                            )}
                          </TableRow>
                        );
                      })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
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
                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredUsers.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
