const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const auth = require("../Auth/auth");

// Mongodb database
const posts = require('../db/postSchema');
const users = require('../db/userSchema');

// Get access to the forum
router.post('/forum', auth, (req, res) => {
    res.status(200).send("Access to Froum is granted!");
});

// Get Posts
router.get('/', async (req, res) => {
    posts.find({}, (err, items) => {
        if (err) throw err;
        res.json(items);
    })
    
});

// Query
router.get('/search', (req, res) => {
    console.log(req.body);
    // if (!req.body.branch || !req.body.year || !req.body.subject) {
    //     res.status(400).send("Include branch, year & subject!");
    //     return;
    // }
    try {
        posts.find({
            branch: req.body.branch ? req.body.branch: "CSE",
            year: req.body.year ? req.body.year: 4,
            subject: req.body.subject ? req.body.subject: "AA"
        }, (err, postList) => {
            if (err) {
                res.sendStatus(400);
            }
            res.status(200).json(postList);
        })
    } catch (err) {
        console.log(err);
    }
});

// Get single Post
router.get('/searchOne', async (req, res) => {
    
    try {
    //     const found = await posts.count({
    //     id: req.body.id || req.query.id
    // }, {
    //     limit: 1
    // });
    // if (found) {
        const foundPost = await posts.findOne({
            _id: req.body.id || req.query.id
        });
        res.status(200).json(foundPost);
    // } else {
        // }
    } catch (err) {
        console.log(err);
        res.status(404).send("Post not Found!");
    }

});

// Create a post
router.post('/', async (req, res) => {
    console.log(req.body);
    if (!req.body.author ||
        !req.body.text ||
        !req.body.branch ||
        !req.body.subject ||
        !req.body.year ||
        !req.body.title
        ) {
        return res.status(400).json({
            mssg: 'Please include all the fields!'
        });
    }

    const newPost = {
        author: req.body.author,
        branch: req.body.branch,
        title: req.body.title,
        subject: req.body.subject,
        year: req.body.year,
        text: req.body.text,
        comments: req.body.comments ? req.body.comments : []
    };
    await posts.create(newPost, err => {
        if (err) throw err;
    });
    res.status(200).send("Post Created Successfully!");
});

// Update a post
router.put('/:id', async (req, res) => {
    
    try {
        await posts.findByIdAndUpdate(req.params.id, req.body);
        res.status(200);
        res.send("Updated");
    } catch (error) {
        res.status(500).send(error);
    }
    
});

// vote
router.put('/vote/:id', async (req, res) => {
    if (!req.body.votes) {
        res.sendStatus(400);
        return;
    }
    try {
        await posts.findByIdAndUpdate(req.params.id, req.body);
        res.status(200);
        res.send("Updated");
    } catch (err) {
        console.log(err);
    }
});
// Delete a post

router.delete('/delete/:id', async (req, res) => {
    try {
        await posts.deleteOne({ id: req.params.id });
        res.status(200);
        res.send("Post Deleted");
    } catch (e) {
        res.status(400);
        res.send(`No member with ${req.params.id} found!`);
    }
});


// Delete all posts
router.delete('/', async (req, res) => {
    posts.remove({}, (err, result) => {
        if (err) res.send(err);
        else {
            res.status(200);
            res.json(result);
        }
    })
});

// Comment on a post
router.put('/comment/:id', async (req, res) => {
    try {
        let result = await posts.findByIdAndUpdate(
            req.params.id, {
                $push: {
                    "comments": {
                        author: req.body.author,
                        comment: req.body.comment
                    }
                }
        }, {
                safe: true,
                upsert: true,
                new: true
        })
        await result.save();
        res.send(result);
        res.status(200);
        console.log(result);
    } catch (err) {
        console.log(err);
    }
    
});


module.exports = router;
