const mongoose = require('mongoose');

let movieSchema = mongoose.Schema({
    Title: {type: String, required: true},
    Description: {type: String, required: true},
    Director: {
        Name: {type: String, required: true},
        Bio: {type: String},
        Birthday: {type: Date}
    },
    Genre: {
        Name: {type: String, required: true},
        Description: {type: String, required: true}
    },
    ImageURL: {type: String},
    ReleaseDate: {type: Date, required: true},
    Featured: {type: Boolean}
});

let userSchema = mongoose.Schema({
    Username: {type: String, required: true},
    Password: {type: String, required: true},
    Email: {type: String, required: true},
    Birthday: {type: Date},
    FavoriteMovies: [{type: mongoose.Schema.Types.ObjectId, ref: 'Movie'}]
});

let Movie = mongoose.model('Movie', movieSchema);
let User = mongoose.model('User', userSchema);

module.exports.Movie = Movie;
module.exports.User = User;