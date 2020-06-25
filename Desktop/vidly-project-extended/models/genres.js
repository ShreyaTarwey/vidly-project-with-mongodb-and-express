const mongoose = require('mongoose');
const joi = require('joi');
mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);
mongoose.connect("mongodb://localhost/vidly")
    // .then(() => console.log('Connected to mongo db...'))
    // .catch(err => console.log('Cant connect to mongodb....', err));

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    }
});

const validateGenre = (gen) => {
    const schema = {
        name: joi.string().min(5).max(255).required()
    };
    const result = joi.validate(gen, schema);
    // console.log(result)
    return result
}

const Genre = mongoose.model('genres', genreSchema);
// console.log(typeof(Genre))


module.exports = validateGenre;
module.exports = genreSchema;
module.exports = Genre;