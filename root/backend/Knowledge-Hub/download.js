const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    // downloads blob with the specified name from the storage 
    if (!req.query.name) {
        res.status(400).send("Mention the blob name!!");
    }
    // url format : https://myblobstorageacc.blob.core.windows.net/documents/format.pdf
    const blobUrl = `https://${process.env.ACC_NAME}.blob.core.windows.net/${process.env.CONTAINER_NAME}/${req.query.name}`;
    res.status(201).send(blobUrl);
});

module.exports = router;