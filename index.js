const express = require('express');
// const path = require('path');
const exphbs = require('express-handlebars');


// Init express
const app = express();

// Handlebars middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const PORT = process.env.PORT || 5000;
app.listen(PORT);
