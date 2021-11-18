const containerClient = require('./createContainer');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    console.log('\nListing blobs...');

    // List the blob(s) in the container.
    let blobNames = [];
    for await (const blob of containerClient.listBlobsFlat()) {
        blobNames.push(blob);
    }
    res.status(200).send(blobNames);
})

module.exports = router;