const bodyParser = require("body-parser");
const path = require("path");
const express = require("express");
require("dotenv").config({
    path: "./config.env"
});
require("./db/conn").connect();

// Init app
const app = express();

app.use(express.json());

app.get('/', (req, res) => res.send("hi"));



// Authentication
const auth = require("./Auth/auth");

app.post("/welcome", auth, (req, res) => {
    res.status(200).header('Content-Type: application/json');
    res.send("Welcome 🙌 ");
});
app.use("/auth/register/student", require("./Auth/registerStudent"));
app.use("/auth/register/admin", require("./Auth/registerAdmin"));
app.use("/auth/login/student", require("./Auth/loginStudent"));
app.use("/auth/login/admin", require("./Auth/loginAdmin"));



// Serve React Homepage
app.use(express.static(path.resolve(__dirname, "../frontend/build")));

// Resource upload , download and search
// app.use()

// Posts API
app.use("/api/posts", require("./Posts/posts"));

// All other GET requests not handled before will return our React app
// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "../frontend/public", "index.html"));
// });

app.use(bodyParser.json());

module.exports = app;
