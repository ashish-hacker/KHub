import axios from 'axios';

const search = async (branchName, yr, sub) => {
  const res = await axios.get('/api/posts/search', {
    branch: branchName,
    year: yr,
    subject: sub
  });
  console.log(res.data);
  return res.data;
};

export default search;
