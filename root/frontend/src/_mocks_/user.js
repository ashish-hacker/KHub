import faker from 'faker';
// utils
import { mockImgAvatar } from '../utils/mockImages';
import { fDateTimeSuffix } from '../utils/formatTime';

// ----------------------------------------------------------------------

const getList = async () => {
  const blobs = [];
  await fetch('http://localhost:4001/api/hub/list')
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      data.map((blob) => {
        blobs.push({
          id: faker.datatype.uuid(),
          avatarUrl: mockImgAvatar(parseInt(Math.random() * 10, 10)),
          name: blob.metadata.author,
          topic: blob.metadata.topic,
          lastModified: fDateTimeSuffix(blob.blobData.properties.lastModified),
          filename: blob.blobData.name,
          votes: blob.metadata.votes
        });
        return true;
      });
    })
    .catch((err) => console.log(err));
  return blobs;
};

export default getList;
