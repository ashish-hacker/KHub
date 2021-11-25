import faker from 'faker';
// utils
import { mockImgAvatar } from '../utils/mockImages';
// ----------------------------------------------------------------------

const getList = async () => {
  const blobs = [];
  await fetch(`${process.env.BACKEND_ENDPOINT}/api/hub/list`)
    .then((res) => res.json())
    .then((data) => {
      data.map((blob) => {
        blobs.push({
          id: faker.datatype.uuid(),
          avatarUrl: mockImgAvatar(parseInt(Math.random() * 10, 10)),
          name: blob.metadata.author,
          topic: blob.metadata.topic,
          lastModified: new Date(blob.blobData.properties.lastModified)
            .toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'short',
              year: 'numeric'
            })
            .replace(/ /g, '-'),
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
