const AzureStorageBlob = require("@azure/storage-blob");
const {
    BlobServiceClient,
    StorageSharedKeyCredential
} = require("@azure/storage-blob");
const {
    BlobServiceClient,
    StorageSharedKeyCredential
} = require("@azure/storage-blob");

// Enter your storage account name and shared key
const account = "<account>";
const accountKey = "<accountkey>";

// Use StorageSharedKeyCredential with storage account and account key
// StorageSharedKeyCredential is only available in Node.js runtime, not in browsers
const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);
const blobServiceClient = new BlobServiceClient(
    `https://${account}.blob.core.windows.net`,
    sharedKeyCredential
);

module.exports = blobServiceClient;

async function createContainer() {
    // Create a container
    const containerName = `newcontainer${new Date().getTime()}`;
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const createContainerResponse = await containerClient.create();
    console.log(`Create container ${containerName} successfully`, createContainerResponse.requestId);
}

// async function listBlobs() {
//     let i = 1;
//     let containers = blobServiceClient.listContainers();
//     for await (const container of containers) {
//         console.log(`Container ${i++}: ${container.name}`);
//     }
// }

// Name of the container
const containerName = "<container name>";


// Upload Data into container
async function uploadData() {
    const containerClient = blobServiceClient.getContainerClient(containerName);

    const content = "Hello world!";
    const blobName = "newblob" + new Date().getTime();
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    const uploadBlobResponse = await blockBlobClient.upload(content, content.length);
    console.log(`Upload block blob ${blobName} successfully`, uploadBlobResponse.requestId);
}


// List all blobs in a container
async function listBlobs() {
    const containerClient = blobServiceClient.getContainerClient(containerName);

    let i = 1;
    let blobs = containerClient.listBlobsFlat();
    for await (const blob of blobs) {
        console.log(`Blob ${i++}: ${blob.name}`);
    }
}


