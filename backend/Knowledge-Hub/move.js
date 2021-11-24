const desContainer = require('./createContainer');
const sourceContainer = require('./getReviewContainer');
const auth = require('../Auth/auth');
const express = require('express');
const router = express.Router();

async function copyAndDelete(blobName) {
    //copy blob

    const sourceBlob = sourceContainer.getBlobClient(blobName);
    const desBlob = desContainer.getBlobClient(sourceBlob.name)
    const response = await desBlob.beginCopyFromURL(sourceBlob.url);
    const result = (await response.pollUntilDone());
    sourceBlob.delete({
        deleteSnapshots: 'include'
    });
    console.log(result._response.status);
    console.log(result.copyStatus);
    return result;
}

router.post('/', async (req, res) => {
    if (!req.body.name) {
        res.status(400).send("Include a name!");
    }
    try {
        const result = await copyAndDelete(req.body.name);
        res.status(result._response.status).send(result.copyStatus);
    } catch (err) {
        console.log(err);
        res.status(403).send(err);
    }
});

module.exports = router;