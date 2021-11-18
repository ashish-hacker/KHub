const {
    BlobServiceClient
} = require("@azure/storage-blob");

const connStr = process.env.AZURE_STORAGE_CONNECTION_STRING;

const blobServiceClient = BlobServiceClient.fromConnectionString(connStr);

module.exports = blobServiceClient;