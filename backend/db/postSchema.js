const mongoose = require("mongoose");

const date = new Date();
const formattedDate = date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
}).replace(/ /g, '-');

const postSchema = new mongoose.Schema({
    author: {
        type: String,
        default: null
    },
    year: {
        type: Number,
        default: 4
    },
    branch: {
        type: String,
        default: "CSE"
    },
    title: {
        type: String
    },
    subject: {
        type: String,
        default: "Web"
    },
    creationDate: {
        type: String,
        default: formattedDate
    },
    text: {
        type: String,
        default: ""
    },
    votes: {
        type: Number,
        default: 0
    },
    comments: {
        type: Array,
        default: []
    }
});

module.exports = mongoose.model("posts", postSchema);