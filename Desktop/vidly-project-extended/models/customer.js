const mongoose = require('mongoose');
const joi = require('joi')
    // mongoose.set('usUnifiedTopology', true);
    // mongoose.set('useNewUrlParser', true)
mongoose.connect("mongodb://localhost/vidly")
    // .then(() => console.log('Connected to mongo db...'))
    // .catch(err => console.log('Cant connect to mongodb....', err));
const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        trim: true
    },
    isGold: {
        type: Boolean,
        required: true
    },
    contactNumber: {
        type: Number,
        required: true,
        min: 5,
        // max: 15,
        match: /^\d{10}$/
    }
});

function validateCustomer(customer) {
    const schema = {
        name: joi.string().min(5).max(255).required(),
        isGold: joi.boolean().required(),
        contactNumber: joi.number().min(5).required()

    };
    const result = joi.validate(customer, schema);
    // console.log(result)
    return result
}

const Customer = mongoose.model('customer', customerSchema);
module.exports = customerSchema;
module.exports = validateCustomer()
module.exports = Customer;