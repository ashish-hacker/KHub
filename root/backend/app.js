const bodyParser = require("body-parser");
const path = require("path");
const cors = require('cors');
const express = require("express");
const fileUpload = require('express-fileupload');
//Auths
// const passport = require("passport");
const oAuth = require('./Auth/googleAuth');
const auth = require("./Auth/auth");
require("dotenv").config({
    path: "./config.env"
});
require("./db/conn").connect();


// Init app
const app = express();

app.use(express.json());
app.use(cors());
app.use(fileUpload());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => res.send("hi"));



// Authentication

// app.use(passport.initialize());
// app.use(passport.session());
app.post("/welcome", auth, (req, res) => {
    res.status(200);
    res.send("Welcome 🙌 ");
});
app.use("/auth/register/student", require("./Auth/registerStudent"));
app.use("/auth/register/admin", require("./Auth/registerAdmin"));
app.use("/auth/login/student", require("./Auth/loginStudent"));
app.use("/auth/login/admin",  require("./Auth/loginAdmin"));
// oAuth(app);


// Serve React Homepage
// app.use(express.static(path.resolve(__dirname, "../frontend/build")));

// Resource upload , download and search
// Upload blob
app.use("/api/hub/upload", require("./Knowledge-Hub/upload"));
app.use("/api/hub/list", require("./Knowledge-Hub/list"));
// app.use()

// Posts API
app.use("/api/posts", require("./Posts/posts"));

// All other GET requests not handled before will return our React app
// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "../frontend/public", "index.html"));
// });

app.use(bodyParser.json());

module.exports = app;