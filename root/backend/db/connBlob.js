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