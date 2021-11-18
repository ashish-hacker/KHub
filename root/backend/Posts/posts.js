const express = require('express');
const uuid = require('uuid');
const router = express.Router();

// Dummy database 
// DONE : Use MongoDB 
// const posts = [
//     {
//         "id": 1,
//         "author": "ashish",
//         "email": "xyz@z.com",
//         "text": "something"
//     },
//     {
//         "id": 2,
//         "author": "kumar",
//         "email": "abc@z.com",
//         "text": "something1"
//     }
// ];

// Mongodb database
const posts = require('../db/postSchema');
const users = require('../db/userSchema');

// Get Posts
router.get('/', async (req, res) => {
    posts.find({}, (err, items) => {
        if (err) throw err;
        res.json(items);
    })
    
});

// Get single Post
router.get('/:id', async (req, res) => {
    const found = await posts.count({
        id: req.params.id
    },
        {
            limit: 1
        });
    if (found) {
        const foundPost = await posts.findOne({ id: req.params.id });
        res.status(200).json(foundPost);
    } else {
        res.status(404).send("Post not Found!");
    }
    
});

// Create a post
router.post('/', async (req, res) => {
    const user = users.findOne({ name: req.body.author });
    console.log(user);
    const newMember = {
        author: req.body.author,
        branch: user.branch,
        year: user.year,
        text: req.body.text,
        comments: req.body.comments ? req.body.comments : []
    };
    if(!newMember.author || !newMember.text) {
        return res.status(400).json({mssg: 'Please include a author and a text.'});
    }
    await posts.create(newMember, err => {
        if (err) throw err;
    });
    
    //res.json(posts);
    res.redirect('/');
    
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

// Delete a post

router.delete('/:id', async (req, res) => {
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
    } catch (err) {
        res.status(400);
        res.send("Error!" + err);
    }
    
});


module.exports = router;
