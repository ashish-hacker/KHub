import faker from 'faker';
import { sample } from 'lodash';
// utils
import { mockImgAvatar } from '../utils/mockImages';
import { fDateTimeSuffix } from '../utils/formatTime';

// ----------------------------------------------------------------------

// const users = [...Array(24)].map((_, index) => ({
//   id: faker.datatype.uuid(),
//   avatarUrl: mockImgAvatar(index + 1),
//   name: faker.name.findName(),
//   company: faker.company.companyName(),
//   isVerified: faker.datatype.boolean(),
//   status: sample(['active', 'banned']),
//   role: sample([
//     'Leader',
//     'Hr Manager',
//     'UI Designer',
//     'UX Designer',
//     'UI/UX Designer',
//     'Project Manager',
//     'Backend Developer',
//     'Full Stack Designer',
//     'Front End Developer',
//     'Full Stack Developer'
//   ])
// }));

const getList = () => {
  const blobs = [];
  fetch('http://localhost:4001/api/hub/list')
    .then((res) => res.json())
    .then((data) => {
      data.map((blob) => {
        blobs.push({
          id: faker.datatype.uuid(),
          avatarUrl: mockImgAvatar(parseInt(Math.random() * 10, 10)),
          name: 'Ashish',
          topic: 'Web Development',
          status: 'active',
          lastModified: fDateTimeSuffix(blob.properties.lastModified),
          filename: blob.name
        });
        return true;
      });
    })
    .catch((err) => console.log(err));
  return blobs;
};
const users = getList();

export default users;
