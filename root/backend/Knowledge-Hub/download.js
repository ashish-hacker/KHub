const blobServiceClient = require('../db/connBlob');


// name of the blob to be queried
const blobName = "<blob name>";

// Download data from blob
async function downloadData() {
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blobClient = containerClient.getBlobClient(blobName);

    // Get blob content from position 0 to the end
    // In Node.js, get downloaded data by accessing downloadBlockBlobResponse.readableStreamBody
    const downloadBlockBlobResponse = await blobClient.download();
    const downloaded = (
        await streamToBuffer(downloadBlockBlobResponse.readableStreamBody)
    ).toString();
    console.log("Downloaded blob content:", downloaded);

    // [Node.js only] A helper method used to read a Node.js readable stream into a Buffer
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
}