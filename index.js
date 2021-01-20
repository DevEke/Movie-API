const express = require('express');
const morgan = require('morgan');

const app = express();

let errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Sorry, Something went wrong!");
}

// Middleware
app.use(express.static('public'));
app.use(morgan('common'));
app.use(errorHandler());

// GET requests
app.get('/movies', (req, res) => {
    res.json(data);
});

app.get('/', (req, res) => {
    res.send("Movie App Home");
})

// Listening Port
app.listen(8080, () => {
    console.log('Listening on port 8080');
});