const express = require('express');
const app = express();

// GET requests
app.get('/movies', (req, res) => {
    res.json(data);
});

app.get('/', (req, res) => {
    res.end("Movie App Home");
})

