//  react
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// material
import { Box, Grid, Container, Typography } from '@mui/material';
import axios from 'axios';
// components
import Page from '../components/Page';
import account from '../_mocks_/account';
// ----------------------------------------------------------------------

export default function DashboardApp() {
  const navigate = useNavigate();

  useEffect(() => {
    try {
      axios
        .post(`${process.env.REACT_APP_BACKEND_ENDPOINT}/api/home/access`, {
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
      localStorage.setItem('username', account.displayName);
    } catch (err) {
      console.log(err);
      navigate('/login', {
        replace: true
      });
    }
  }, []);

  return (
    <Page title="Home">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Hi, Welcome back</Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs="auto" md={10} lg={8}>
            <Typography>
              Hello There! &nbsp;
              <code>print()</code>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
