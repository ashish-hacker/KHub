const express = require('express');
const router = express.Router();
const auth = require("../Auth/auth");

router.post('/', auth, (req, res) => {
    res.status(200).send("Access to Hub is granted!");
})

module.exports = router;