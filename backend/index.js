const express = require("express");
const app = require("./app");
require("dotenv").config("./config.env");

const { API_PORT } = process.env;
const PORT = API_PORT;

app.listen(PORT, () => console.log(`Server is running at port no. :${PORT}`));
