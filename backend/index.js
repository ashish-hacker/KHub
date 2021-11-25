const express = require("express");
const path = require("path");
const app = require("./app");
require("dotenv").config("./config.env");

const PORT = process.env.PORT || 4001;

if (process.env.NODE_ENV === "production") {
    console.log("In Production!");
    app.use(express.static(path.join(__dirname, "build")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "build", "index.html"));
    });
}

app.listen(PORT, () => console.log(`Server is running at port no. :${PORT}`));
