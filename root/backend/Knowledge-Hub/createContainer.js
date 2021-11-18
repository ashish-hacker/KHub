const blobServiceClient = require('../db/connBlob');


// name of the container
const containerName = 'documents';

console.log(`\nGetting container...${containerName}`);


// Get a reference to a container
const containerClient = blobServiceClient.getContainerClient(containerName);

// Create the container
// const createContainerResponse = containerClient.create();
// console.log("Container was created successfully. requestId: ", createContainerResponse.requestId);

module.exports = containerClient;