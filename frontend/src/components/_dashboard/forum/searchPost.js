import axios from 'axios';

const search = async (branchName, yr, sub) => {
  console.log(yr);
  const res = await axios.get(
    `${process.env.BACKEND_ENDPOINT}/api/posts/search?branch=${branchName}&year=${yr}&subject=${sub}`
  );
  console.log(res.data);
  return res.data;
};

export default search;
