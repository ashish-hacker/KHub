const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    author: {
        type: String,
        default: null
    },
    email: {
        type: String,
        unique: true
    },
    text: {
        type: String,
        default: ""
    },
    token: {
        type: String
    },
});

module.exports = mongoose.model("posts", userSchema);