const express = require("express");
const path = require("path");
const app = require("./app");
require("dotenv").config("./config.env");

const { API_PORT } = process.env;
const PORT = process.env.PORT || API_PORT;

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "..", "frontend", "build")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "..", "frontend", "build", "index.html"));
    });
}

app.listen(PORT, () => console.log(`Server is running at port no. :${PORT}`));
