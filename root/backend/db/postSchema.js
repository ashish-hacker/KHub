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
        type: String,
        unique: false
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