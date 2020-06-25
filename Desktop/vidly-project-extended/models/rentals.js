const mongoose = require('mongoose');
const joi = require('joi');
mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);
mongoose.connect("mongodb://localhost/vidly")
    // .then(() => console.log('Connected to mongo db...'))
    // .catch(err => console.log('Cant connect to mongodb....', err));
    // const { customerSchema } = require('./customer');
    // const { movieSchema } = require('./movies');

const Rental = mongoose.model('rentals', new mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 255
            },
            isGold: {
                type: Boolean,
                required: true
            },
            phone: {
                type: Number,
                // match: /9518441835/
                min: 5,
                max: 15
            }
        }),
        required: true
    },
    movie: {
        type: new mongoose.Schema({
            name: {
                type: String,
                minlength: 5,
                maxlength: 255,
                required: true
            },
            dailyRentalRate: {
                type: Number,
                min: 0,
                max: 255,
                required: true
            },
            numberInStock: {
                type: Number,
                min: 0,
                max: 255,
                required: true
            }
        })
    }
}));

function validateRental(rental) {
    const schema = {
        customerId: joi.string().required(),
        movieID: joi.string().required()
    };
    const result = joi.validate(rental, schema);
    // console.log(result);
}

module.exports.Rental = Rental;
module.exports.validate = validateRental();