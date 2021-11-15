const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true
    },
    author: {
        type: String,
        default: null
    },
    email: {
        type: String
    },
    year: {
        type: Number
    },
    branch: {
        type: String
    },
    subject: {
        type: String
    },
    topic: {
        type: String
    },
    text: {
        type: String,
        default: ""
    },
    comments: {
        type: Array,
        default: []
    }
});

module.exports = mongoose.model("posts", postSchema);