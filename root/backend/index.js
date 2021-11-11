const express = require("express");

const PORT = process.env.PORT || 5000;

// Init app
const app = express();


app.get('/', (req, res) => {
    res.send("Hello");
});

// Posts api routes
app.use('/api/posts', require('./routes/apis/posts'));


app.listen(PORT, () => console.log(`Server is running at port no. :${PORT}`));
