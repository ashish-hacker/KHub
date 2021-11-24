// ----------------------------------------------------------------------
import axios from 'axios';

const getList = async () => {
  const res = await axios.get('http://localhost:4001/api/posts');
  console.log(typeof res.data[0].creationDate);
  return res.data;
};

export default getList;
