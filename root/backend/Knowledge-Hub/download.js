const express = require('express');
const router = express.Router();

// A helper method used to read a Node.js readable stream into a Buffer
async function streamToBuffer(readableStream) {
    return new Promise((resolve, reject) => {
        const chunks = [];
        readableStream.on("data", (data) => {
            chunks.push(data instanceof Buffer ? data : Buffer.from(data));
        });
        readableStream.on("end", () => {
            resolve(Buffer.concat(chunks));
        });
        readableStream.on("error", reject);
    });
}

// Download data from blob
async function downloadData(blobName) {
    const containerClient = blobServiceClient.getContainerClient(process.env.CONTAINER_NAME);
    const blobClient = containerClient.getBlobClient(blobName);

    // Get blob content from position 0 to the end
    // get downloaded data 
    const downloadBlockBlobResponse = await blobClient.download();
    const downloaded = (
        await streamToBuffer(downloadBlockBlobResponse.readableStreamBody)
    ).toString();
    console.log("Downloaded blob content:", downloaded);
    return downloaded;
}

router.get('/', async (req, res) => {
    if (!req) {
        res.status(400).send("No files Recieved!");
    }
    const downloadedData = await downloadData(req.name);
    res.status(201).send(downloadedData);
});

module.exports = router;