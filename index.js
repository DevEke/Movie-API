const express = require('express');
const app = express();

app.use(express.static('public'));

// GET requests
app.get('/movies', (req, res) => {
    res.json(data);
});

app.get('/', (req, res) => {
    res.end("Movie App Home");
})

app.listen(8080, () => {
    console.log('Listening on port 8080');
});