const mongoose = require('mongoose');
const joi = require('joi')
const genreSchema = require('./genres');
// console.log(typeof(genreSchema))
// mongoose.set('useUnifiedTopology', true);
// mongoose.set('useNewUrlParser', true);
mongoose.connect("mongodb://localhost/vidly")
    // .then(() => console.log('Connected to mongo db...'))
    // .catch(err => console.log('Cant connect to mongodb....', err));
const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    genre: {
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 255
            }
        }),
        required: true
    },
    numberInStock: {
        type: Number,
        min: 0,
        max: 255,
        required: true

    },
    dailyRentalRate: {
        type: Number,
        min: 0,
        max: 255,
        required: true
    }

});

function validateMovie(movie) {
    const schema = {
        name: joi.string().min(5).max(255).required().trim(),
        genreId: joi.string().required(),
        numberInStock: joi.number().min(0).max(255).required(),
        dailyRentalRate: joi.number().max(255).min(0).required()
    };
    const result = joi.validate(movie, schema);
    // console.log(result)

}
const Movies = mongoose.model('movies', movieSchema);


module.exports = validateMovie()
module.exports = movieSchema;
module.exports = Movies;