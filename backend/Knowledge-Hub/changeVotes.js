const containerClient = require('./createContainer');
const express = require('express');
const router = express.Router();


// Upload Data into container
async function modifyVote(props) {
    const blobName = props.filename;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    const vote = props.votes;
    // const vote = props.voteType === 'upvote' ? props.votes + 1 : props.votes - 1;
    // console.log(vote);
    try {
        // sets the metadata where votes field gets changed
        await blockBlobClient.setMetadata({
            'author': props.name,
            'topic': props.topic,
            'votes': vote.toString()
        });
    } catch (err) {
        console.log(err);
        return err;
    }
    return true;
}

router.post('/', async (req, res) => {
    // req body should contain 6 fields:
    //                      1.name
    //                      2.topic
    //                      3.votes
    //                      4.filename
    //                      5.token
    //                      6.voteType (upvote or downvote)

    if (!req.body.votes) {
        return res.status(400).json({
            msg: 'No body uploaded'
        });
    }
    const x = await modifyVote(req.body);
    res.status(200).send("Success!");
})

module.exports = router;