const containerClient = require('./getReviewContainer');
const mainContainerClient = require('./createContainer');
const express = require('express');

const router = express.Router();


// Upload Data into container
async function uploadData(props) {
    // console.log(props);
    const blobName = props.files.file.name;
    let blockBlobClient;
    if (props.body.is_admin === 'true') {
        blockBlobClient = mainContainerClient.getBlockBlobClient(blobName);
    } else {
        blockBlobClient = containerClient.getBlockBlobClient(blobName);
    }
    let uploadBlobResponse;
    try {
        uploadBlobResponse = await blockBlobClient.uploadData(props.files.file.data);
        blockBlobClient.setMetadata({
            'author': props.body.author,
            'topic': props.body.topic,
            'votes': "0"
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
    // console.log(req);
    if (!req.files) {
        return res.status(400).json({
            msg: 'No file uploaded'
        });
    }
    const uploadBlobResponse = await uploadData(req);
    res.status(200).send(uploadBlobResponse);
})

module.exports = router;