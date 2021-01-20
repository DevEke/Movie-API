const express = require('express');
const morgan = require('morgan');

const app = express();

// Movies List
let movies = [
    {
        title: "Ocean's Eleven",
        genres: ["Thriller", "Comedy", "Crime"],
        director: "Steven Soderbergh"
    },
    {
        title: "Ocean's Twelve",
        genres: ["Thriller", "Comedy", "Crime"],
        director: "Steven Soderbergh"
    },
    {
        title: "Guardians of the Galaxy",
        genres: ["Action", "Adventure", "Comedy"],
        director: "James Gunn"
    },
    {
        title: "Friday",
        genres: ["Comedy", "Drama"],
        director: "F. Gary Gary"
    },
    {
        title: "Inception",
        genres: ["Action", "Adventure", "Sci-Fi"],
        director: "Christopher Nolan"
    },
    {
        title: "Rush Hour",
        genres: ["Action", "Comedy", "Crime"],
        director: "Brett Ratner"
    },
    {
        title: "V for Vendetta",
        genres: ["Action", "Drama", "Sci-Fi"],
        director: "James McTeigue"
    },
    {
        title: "28 Weeks Later",
        genres: ["Action", "Horror", "Sci-Fi"],
        director: "Juan Carlos Fresnadillo"
    },
    {
        title: "Avengers: Endgame",
        genres: ["Action", "Adventure", "Drama"],
        director: "Anthony Russo"
    },
    {
        title: "SAW",
        genres: ["Horror", "Mystery", "Crime"],
        director: "James Wan"
    }
]


// Middleware
app.use(express.static('public'));
app.use(morgan('common'));
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Sorry, Something went wrong!");
});

// GET requests
app.get('/movies', (req, res) => {
    res.json(movies);
});

app.get('/', (req, res) => {
    res.send("Movie App Home");
})

// Listening Port
app.listen(8080, () => {
    console.log('Listening on port 8080');
});