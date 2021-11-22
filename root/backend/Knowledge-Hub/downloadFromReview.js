const express = require('express');
const auth = require('../Auth/auth');
const router = express.Router();

router.post('/', auth, (req, res) => {
    // downloads blob with the specified name from the storage 
    if (!req.query.name) {
        res.status(400).send("Mention the blob name!!");
    }
    // url format : https://myblobstorageacc.blob.core.windows.net/documents/format.pdf
    const blobUrl = `https://${process.env.ACC_NAME}.blob.core.windows.net/${process.env.IN_REVIEW_CONTAINER}/${req.query.name}`;
    res.status(201).send(blobUrl);
});

module.exports = router;