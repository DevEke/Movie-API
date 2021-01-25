const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Models = require('./models.js');
const passport = require('passport');
const Movies = Models.Movie;
const Users = Models.User;
require('./passport');
mongoose.connect('mongodb://localhost:27017/MovieDB', { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();



// Middleware
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(morgan('common'));
let auth = require('./auth')(app);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Sorry, Something went wrong!");
});


// GET requests
app.get('/', (req, res) => {
    let message = "Movie App Home";
    res.status(200).send(message);
})

app.get('/movies', (req, res) => {
    Movies.find()
        .then((movies) => {
            res.status(200).json(movies);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
        });
});

app.get('/users/:Username', (req, res) => {
    Users.findOne({ Username: req.params.Username})
        .then((user) => {
            res.status(200).json(user);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
        });
});

app.get('/movies/:Title', (req, res) => {
    Movies.findOne({ Title: req.params.Title})
        .then((movie) => {
            res.status(200).json(movie);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
        });
});

app.get('/genres/:Name', (req, res) => {
    Movies.findOne({ 'Genre.Name': req.params.Name })
        .then((movie) => {
            let genre = movie['Genre'];
            res.status(200).json(genre);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
        });
});

app.get('/directors/:Name', (req, res) => {
    Movies.findOne({ 'Director.Name': req.params.Name })
        .then((movie) => {
            let director = movie['Director'];
            res.status(200).json(director);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
        });
});


// POST Requests
app.post('/users', (req, res) => {
    Users.findOne({ Username: req.body.Username })
        .then((user) => {
            if (user) {
                return res.status(400).send(req.body.Username + ' already exists.')
            } else {
                Users.create({
                    Username: req.body.Username,
                    Password: req.body.Password,
                    Email: req.body.Email,
                    Birthday: req.body.Birthday
                }).then((user) => { res.status(201).json(user)})
                .catch((error) => {
                    console.error(error);
                    res.status(500).send('Error: ' + error);
                })
            }
        }).catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
        });
});

app.post('/users/:Username/favorites/:MovieID', (req, res) => {
    Users.findOneAndUpdate({ Username: req.params.Username }, { $push: 
        { FavoriteMovies: req.params.MovieID }
    }, {new: true})
    .then((updatedList) => {
        res.status(201).json(updatedList);
    })
    .catch((error) => {
        console.error(error);
        res.status(500).send('Error: ' + error);
    });
});

// PUT Requests
app.put('/users/:Username', (req, res) => {
    Users.findOneAndUpdate({ Username: req.params.Username}, { $set: 
        {
            Username: req.body.Username,
            Password: req.body.Password,
            Email: req.body.Email,
            Birthday: req.body.Birthday
        }
    }, { new: true })
    .then((updatedUser) => {
        res.status(201).json(updatedUser);
    })
    .catch((error) => {
        console.error(error);
        res.status(500).send('Error: ' + error);
    });
});

//DELETE Requests
app.delete('/users/:Username/favorites/:MovieID', (req, res) => {
    Users.findOneAndUpdate({ Username: req.body.Username}, { $pull: 
        { FavoriteMovies: req.params.MovieID }
    }, {new: true})
    .then((updatedList) => {
        res.status(200).json(updatedList);
    })
    .catch((error) => {
        console.error(error);
        res.status(500).send('Error: ' + error);
    });
});

app.delete('/users/:Username', (req, res) => {
    Users.findOneAndRemove({ Username: req.params.Username })
        .then((user) => {
            if (!user) {
                res.status(400).send(req.params.Username + ' was not found');
            } else {
                res.status(200).send(req.params.Username + ' was deleted');
            }
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
        })
})


// Listening Port
app.listen(8080, () => {
    console.log('Listening on port 8080');
});