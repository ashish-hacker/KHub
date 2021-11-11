const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const posts = [
    {
        "id": 1,
        "author": "ashish",
        "email": "xyz@z.com",
        "text": "something"
    },
    {
        "id": 2,
        "author": "kumar",
        "email": "abc@z.com",
        "text": "something1"
    }
];

// get memebers
router.get('/', (req, res) => res.json(posts));

// Get single member
router.get('/:id', (req, res) => {
    const found = posts.some(member => member.id === parseInt(req.params.id));
    if(found) {
        res.json(posts.filter(member => member.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({message: `No member with id ${req.params.id}`});
    }
});

// Create a member
router.post('/', (req, res) => {
    const newMember = {
        id: uuid.v4(),
        author: req.body.author,
        email: req.body.email,
        status: 'active'
    };
    if(!newMember.author || !newMember.email) {
        return res.status(400).json({mssg: 'Please include a author and a email.'});
    }
    posts.push(newMember);
    //res.json(posts);
    res.redirect('/');
});

// Update posts
router.put('/:id', (req, res) => {
    const found = posts.some(member => member.id === parseInt(req.params.id));
    if(found) {
        const updatedMember = req.body;
        posts.forEach(member => {
            if(member.id === parseInt(req.params.id)) {
                member.author = updatedMember.author ? updatedMember.author: member.author;
                member.email = updatedMember.email ? updatedMember.email: member.email;

                res.json({mssg:'Member updated', member})
            }
        });
    } else {
        res.status(400).json({message: `No member with id ${req.params.id}`});
    }
});

// Delete member
router.delete('/:id', (req, res) => {
    const found = posts.some(member => member.id === parseInt(req.params.id));
    if(found) {
        res.json({mssg: "Member deleted", posts: posts.filter(member => member.id !== parseInt(req.params.id))});
    } else {
        res.status(400).json({message: `No member with id ${req.params.id}`});
    }
});

module.exports = router;
