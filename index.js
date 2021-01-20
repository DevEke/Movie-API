const express = require('express');
const morgan = require('morgan');

const app = express();


app.use(express.static('public'));
app.use(morgan('common'));

// GET requests
app.get('/movies', (req, res) => {
    res.json(data);
});

app.get('/', (req, res) => {
    res.send("Movie App Home");
})

app.listen(8080, () => {
    console.log('Listening on port 8080');
});