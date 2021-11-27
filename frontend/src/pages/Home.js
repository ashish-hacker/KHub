//  react
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// material
import { Box, Grid, Container, Typography, Stack } from '@mui/material';
import axios from 'axios';
// components
import Page from '../components/Page';
import account from '../data/account';

require('dotenv').config();
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
        <Box sx={{ pb: 10 }}>
          <Typography variant="h4">Hi, Welcome to KHub</Typography>
        </Box>
        <Stack spacing={27}>
          <Stack direction="row" spacing={10} sx={{ md: 10 }}>
            <Typography fontSize={18} mt={15}>
              Knowledge-Hub is your all in one destination for resources for your studies. Be it the
              book or the assignment questions. You don't have to worry about them. We have all of
              them organized in a single place.
            </Typography>
            <img
              style={{ width: 450, height: 400 }}
              src="/static/illustrations/home_ill.png"
              alt="avatar"
            />
          </Stack>
          <Stack direction="row-reverse" spacing={10} sx={{ pd: 10 }}>
            <Typography fontSize={18}>
              <Typography variant="h4" mb={5}>
                Hub
              </Typography>
              Find all the useful resources provided by the teachers and schoolmates just by a
              search.
              <br />
              <i>Want to get top lecture notes and resource files uploaded by your best teacher?</i>
              &nbsp;Just search the name of your teacher.
              <br />
              Search anything you want, And get the files related to your search.
            </Typography>
            <img
              style={{ width: 400, height: 400 }}
              src="/static/illustrations/hub.png"
              alt="avatar"
            />
          </Stack>
          <Stack direction="row" spacing={10} sx={{ pd: 10 }}>
            <Typography fontSize={18}>
              <Typography variant="h4" mb={5}>
                Forum
              </Typography>
              Find Important Discussions and Detailed Posts on your subject topics. Ask questions on
              your doubts and get it cleared by your teachers and fellow students.
            </Typography>
            <img
              style={{ width: 400, height: 400 }}
              src="/static/illustrations/forum_ill.png"
              alt="avatar"
            />
          </Stack>
          <Stack direction="row" spacing={10} sx={{ pd: 10 }}>
            <Typography ml={10} fontSize={18}>
              <Typography variant="h4" mb={5}>
                Contact Us
              </Typography>
              Have any queries? Want to contact us?
              <address>
                <br />
                <br />
                <b>Email:</b> &nbsp;
                <a
                  href="mailto:akpanigrahy26@gmail.com"
                  style={{ textDecoration: 'none', color: 'black' }}
                >
                  akpanigrahy26@gmail.com
                </a>
                <br />
                <br />
                <b>Phone:</b> &nbsp;
                <a href="tel:+916372535303" style={{ textDecoration: 'none', color: 'black' }}>
                  +916372535303
                </a>
              </address>
            </Typography>
            <img
              style={{ width: 400, height: 300 }}
              src="/static/illustrations/contact.png"
              alt="avatar"
            />
          </Stack>
        </Stack>
      </Container>
    </Page>
  );
}
