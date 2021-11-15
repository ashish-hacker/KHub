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
    const newMember = {
        id: uuid.v4(),
        author: req.body.author,
        text: req.body.text
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
    const found = await posts.count({
        id: req.params.id
    }, {
        limit: 1
    });
    if (found) {
        await posts.updateOne({
                    id: req.params.id
                },
            {
            $set: {
                    email: req.params.email,
                    author: req.params.author,
                    text: req.params.text
                },
                $currentDate: {
                    lastModified: true
                }
        }
        )

        res.status(200);
    } else {
        res.status(404).send("Post not Found!");
    }
    
});

// Delete a post
router.delete('/:id', async (req, res) => {
    try {
        await posts.delete({ id: req.params.id });
    } catch (e) {
        res.status(400);
        res.send(`No member with ${req.params.id} found!`);
    }
});

module.exports = router;
