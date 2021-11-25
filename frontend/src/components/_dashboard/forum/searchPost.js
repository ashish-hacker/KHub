import axios from 'axios';

require('dotenv').config();

const search = async (branchName, yr, sub) => {
  console.log(yr);
  const res = await axios.get(
    `${process.env.REACT_APP_BACKEND_ENDPOINT}/api/posts/search?branch=${branchName}&year=${yr}&subject=${sub}`
  );
  console.log(res.data);
  return res.data;
};

export default search;
