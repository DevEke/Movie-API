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
app.get('/', (req, res) => {
    res.send("Movie App Home");
})

app.get('/movies', (req, res) => {
    res.json(movies);
    res.status(200).send('Successful GET request returning list of all movies');
});

app.get('/movies/:title', (req, res) => {
    res.json(movies.find((movie) => {
        return movie.title === req.params.title
    }));
})

app.get('/genres/:name', (req, res) => {
    let message = 'Successful GET request returning information about genre';
    res.status(200).send(message);
})

app.get('/directors/:name', (req, res) => {
    let message = 'Successful GET request returning information about directors';
    res.status(200).send(message);
})


// POST Requests
app.post('/users', (req, res) => {
    let message = 'Successful POST request to create a new user';
    res.status(200).send(message);
})

app.post('/users/:username/favorites', (req, res) => {
    let message = 'Successful POST request to add a movie to the favorites list';
    res.status(200).send(message);
})

// PUT Requests
app.put('/users/:username', (req, res) => {
    let message = 'Successful PUT request to update a user\'s username';
    res.status(200).send(message);
})

app.put('/users/:email', (req, res) => {
    let message = 'Successful PUT request to update a user\'s email';
    res.status(200).send(message);
})

app.put('/users/:password', (req, res) => {
    let message = 'Successful PUT request to update a user\'s password';
    res.status(200).send(message);
})

//DELETE Requests
app.delete('/users/:username/favorites', (req, res) => {
    let message = 'Successful DELETE request to remove a movie from the user\'s favorite list';
    res.status(200).send(message);
})

app.delete('/users/:email', (req, res) => {
    let message = 'Successful DELETE request to unregister a user';
    res.status(200).send(message);
})


// Listening Port
app.listen(8080, () => {
    console.log('Listening on port 8080');
});