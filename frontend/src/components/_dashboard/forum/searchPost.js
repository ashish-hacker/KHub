import axios from 'axios';

require('dotenv').config();

const search = async (branchName, yr, sub) => {
  const res = await axios.get(
    `${process.env.REACT_APP_BACKEND_ENDPOINT}/api/posts/search?branch=${branchName}&year=${yr}&subject=${sub}`
  );
  return res.data;
};

export default search;
