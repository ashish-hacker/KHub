const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const store = require('store');
require("dotenv").config({
    path: "./config.env"
});

// importing user context
const User = require("../db/userSchema");

router.post("/", async (req, res) => {
    // Login as a Student
    try {
        // Get user input
        const {
            email,
            password
        } = req.body;

        // Validate user input
        if (!(email && password)) {
            res.status(400).send("All input is required");
        }
        // Validate if user exist in our database
        const user = await User.findOne({
            email
        });

        if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            const token = jwt.sign({
                    user_id: user._id,
                    email
                },
                process.env.TOKEN_KEY, {
                    expiresIn: "2h",
                }
            );

            // save user token
            user.token = token;

            // user
            res.status(200).send(user);
        }
        else {
            res.status(409).send("Invalid Credentials");
        }
            
    } catch (err) {
        console.log(err);
    }
});



module.exports = router;