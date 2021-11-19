const express = require('express');
const router = express.Router();
const auth = require("../Auth/auth");
const users = require('../db/userSchema');

router.get('/', async (req, res) => {
    try {
        await users.findOne({
            email: req.query.email
        }).exec()
            .then((r) => {
                const response = {
                    name: r.name,
                    email: r.email,
                    branch: r.branch,
                    year: r.year
                }
                res.status(200).send(r);
            });
    } catch (err) {
        console.log(err);
        res.status(404).send(err);
    }
})

module.exports = router;