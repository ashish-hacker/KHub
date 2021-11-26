// ----------------------------------------------------------------------
import axios from 'axios';
// Gets All the Posts from the database
require('dotenv').config();

const getList = async () => {
  const res = await axios.get(`${process.env.REACT_APP_BACKEND_ENDPOINT}/api/posts`);
  // console.log(typeof res.data[0].creationDate);
  return res.data;
};

export default getList;
