// ----------------------------------------------------------------------
import axios from 'axios';

require('dotenv').config();

const fetchUser = async () => {
  const res = await axios
    .get(
      `${process.env.REACT_APP_BACKEND_ENDPOINT}/api/fetchUser?email=${localStorage.getItem(
        'email'
      )}`
    )
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
