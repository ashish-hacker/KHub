const containerClient = require('./createContainer');
const express = require('express');
const {
    Readable
} = require('stream');

const router = express.Router();


// Upload Data into container
async function uploadData(props) {
    // const content = props.file;
    
    const blobName = props.name;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    let uploadBlobResponse;
    try {
        // const stream = Readable.from(props.data.toString());  if want to upload as a stream
        uploadBlobResponse = await blockBlobClient.uploadData(props.data, {
            metadata: {
                'name': props.name
            },
            tags: {
                'topic': props.topic
            }
        });
        }
        catch (err) {
            console.log(err);
        return err;
    }
    console.log(`Upload block blob ${blobName} successfully`, uploadBlobResponse.requestId);
    return uploadBlobResponse;
}

router.post('/', async (req, res) => {
    // console.log(req.files);
    if (!req.files) {
        return res.status(400).json({
            msg: 'No file uploaded'
        });
    }
    const uploadBlobResponse = await uploadData(req.files.file);
    res.status(200).send(uploadBlobResponse);
})

module.exports = router;