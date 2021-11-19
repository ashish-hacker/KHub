const express = require('express');
const router = express.Router();
const containerClient = require('./createContainer'); // Azure service client


router.delete('/', async (req, res) => {

    if (!req.query.name) {
        res.status(400).send("Include a name!");
    }
    // Get the blob client for the particular blob
    const blobClient = containerClient.getBlobClient(req.query.name);
    await blobClient.delete({
        deleteSnapshots: 'include'
    });
    res.status(200).send("Blob deleted successfully!");
})

module.exports = router;