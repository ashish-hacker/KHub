const bodyParser = require("body-parser");
const path = require("path");
const cors = require('cors');
const express = require("express");
const fileUpload = require('express-fileupload');
require("./db/conn").connect();
//Auths
const auth = require("./Auth/auth");
require("dotenv").config({
    path: "./config.env"
});


// Init app
const app = express();

app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(express.urlencoded({ extended: false }));
app.get('/', (req, res) => res.send("hi"));



// Authentication

app.post("/welcome", auth, (req, res) => {
    res.status(200);
    res.send("Welcome 🙌 ");
});
app.use("/auth/register/student", require("./Auth/registerStudent"));
app.use("/auth/register/admin", require("./Auth/registerAdmin"));
app.use("/auth/login/student", require("./Auth/loginStudent"));
app.use("/auth/login/admin",  require("./Auth/loginAdmin"));
// oAuth(app);
// require('./Auth/googleAuth')(app);


// Resource upload , download and search
app.use("/api/hub/access", require("./Knowledge-Hub/access"));
app.use("/api/hub/upload", require("./Knowledge-Hub/upload"));
app.use("/api/hub/list", require("./Knowledge-Hub/list"));
app.use("/api/hub/listReview", require("./Knowledge-Hub/listInReview"));
app.use("/api/hub/download", require("./Knowledge-Hub/download"));
app.use("/api/hub/downloadTemp", require("./Knowledge-Hub/downloadFromReview"));
app.use("/api/hub/delete", require("./Knowledge-Hub/deleteBlob"));
app.use("/api/hub/deleteReview", require("./Knowledge-Hub/deleteReviewedBlob"));
app.use("/api/hub/search", require("./Knowledge-Hub/search"));
app.use("/api/hub/move", require("./Knowledge-Hub/move"));
app.use("/api/hub/changeVotes", require("./Knowledge-Hub/changeVotes"));
// app.use()

// Posts API
app.use("/api/posts", require("./Posts/posts"));
app.use("/api/forum/access", require("./Posts/access"));

// Access to home
app.use("/api/home/access", require("./home/access"));
app.use("/api/fetchUser", require("./home/fetchUser"));


app.use(bodyParser.json());

module.exports = app;