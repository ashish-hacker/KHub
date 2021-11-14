const blobServiceClient = require('../db/connBlob');
const express = require('express');
const router = express.Router();

// Upload Data into container
async function uploadData() {
    const containerClient = blobServiceClient.getContainerClient(containerName);

    const content = "Hello world!";
    const blobName = "newblob" + new Date().getTime();
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    const uploadBlobResponse = await blockBlobClient.upload(content, content.length);
    console.log(`Upload block blob ${blobName} successfully`, uploadBlobResponse.requestId);
}

router.post('/', (req, res) => {
    
})