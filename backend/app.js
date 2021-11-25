const bodyParser = require("body-parser");
const path = require("path");
const cors = require('cors');
const express = require("express");
const fileUpload = require('express-fileupload');
require("./db/conn").connect();
//Auths
const auth = require("./middlewares/Auth/auth");
require("dotenv").config({
    path: "./config.env"
});


// Init app
const app = express();

app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "./frontend/build")));
app.get('/', (req, res) => res.send("hi"));



// Authentication

app.post("/welcome", auth, (req, res) => {
    res.status(200);
    res.send("Welcome 🙌 ");
});
app.use("/auth/register/student", require("./middlewares/Auth/registerStudent"));
app.use("/auth/register/admin", require("./middlewares/Auth/registerAdmin"));
app.use("/auth/login/student", require("./middlewares/Auth/loginStudent"));
app.use("/auth/login/admin", require("./middlewares/Auth/loginAdmin"));
// oAuth(app);
// require('./Auth/googleAuth')(app);


// Resource upload , download and search
app.use("/api/hub/access", require("./middlewares/Knowledge-Hub/access"));
app.use("/api/hub/upload", require("./middlewares/Knowledge-Hub/upload"));
app.use("/api/hub/list", require("./middlewares/Knowledge-Hub/list"));
app.use("/api/hub/listReview", require("./middlewares/Knowledge-Hub/listInReview"));
app.use("/api/hub/download", require("./middlewares/Knowledge-Hub/download"));
app.use("/api/hub/downloadTemp", require("./middlewares/Knowledge-Hub/downloadFromReview"));
app.use("/api/hub/delete", require("./middlewares/Knowledge-Hub/deleteBlob"));
app.use("/api/hub/deleteReview", require("./middlewares/Knowledge-Hub/deleteReviewedBlob"));
app.use("/api/hub/search", require("./middlewares/Knowledge-Hub/search"));
app.use("/api/hub/move", require("./middlewares/Knowledge-Hub/move"));
app.use("/api/hub/changeVotes", require("./middlewares/Knowledge-Hub/changeVotes"));
// app.use()

// Posts API
app.use("/api/posts", require("./middlewares/Posts/posts"));
app.use("/api/forum/access", require("./middlewares/Posts/access"));

// Access to home
app.use("/api/home/access", require("./middlewares/home/access"));
app.use("/api/fetchUser", require("./middlewares/home/fetchUser"));


app.use(bodyParser.json());

module.exports = app;