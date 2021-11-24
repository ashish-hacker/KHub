// ----------------------------------------------------------------------

import axios from 'axios';

const fetchUser = async () => {
  const res = await axios
    .get(`http://localhost:4001/api/fetchUser?email=${localStorage.getItem('email')}`)
    .then((res) => res)
    .then((data) => data);
  // console.log(res);
  return res;
};

const user = fetchUser();
const account = {
  displayName: '',
  email: '',
  photoURL: '/static/mock-images/avatars/avatar_default.jpg'
};

user.then((res) => {
  account.displayName = res.data.name;
  account.email = res.data.email;
});

export default account;
