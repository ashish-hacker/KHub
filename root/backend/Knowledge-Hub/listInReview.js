const containerClient = require('./getReviewContainer');
const auth = require('../Auth/auth');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    console.log('\nListing blobs...');

    // List the blob(s) in the container.
    let blobs = [];
    for await (const blob of containerClient.listBlobsFlat()) {
        const blockBlobClient = containerClient.getBlockBlobClient(blob.name);
        const meta = (await blockBlobClient.getProperties()).metadata;
        // console.log(meta);
        const data = {
            blobData: blob,
            metadata: meta
        };
        blobs.push(data);
    }

    res.status(200).send(blobs);
})

module.exports = router;