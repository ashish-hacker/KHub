const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    author: {
        type: String,
        default: null
    },
    email: {
        type: String
    },
    year: {
        type: Number,
        default: 4
    },
    branch: {
        type: String,
        default: "CSE"
    },
    subject: {
        type: String,
        default: "Web"
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