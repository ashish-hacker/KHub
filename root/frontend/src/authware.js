import axios from 'axios';

const httpReq = async (mode, endpoint, req) => {
  let res;
  req.token = localStorage.getItem('jwt');
  try {
    if (mode === 'get') {
      await axios
        .get(endpoint, req)
        .then((result) => {
          // console.log(result.data);
          res = result.data;
        })
        .catch((err) => console.log(err));
    } else if (mode === 'post') {
      await axios
        .post(endpoint, req)
        .then((result) => {
          res = result.data;
        })
        .catch((err) => console.log(err));
    } else if (mode === 'put') {
      await axios
        .put(endpoint, req)
        .then((result) => {
          res = result.data;
        })
        .catch((err) => console.log(err));
    } else if (mode === 'delete') {
      await axios
        .delete(endpoint, req)
        .then((result) => {
          res = result.data;
        })
        .catch((err) => console.log(err));
    }
  } catch (err) {
    console.log(err);
  }
  // console.log(res);
  return res;
};

export default httpReq;
