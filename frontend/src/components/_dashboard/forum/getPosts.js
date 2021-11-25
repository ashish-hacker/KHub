// ----------------------------------------------------------------------
import axios from 'axios';

const getList = async () => {
  const res = await axios.get(`${process.env.BACKEND_ENDPOINT}/api/posts`);
  console.log(typeof res.data[0].creationDate);
  return res.data;
};

export default getList;
