const express = require('express');
const joi = require('joi');
const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb://localhost/customer-api')
    .then(() => console.log('Connected to Mongo db...'))
    .catch(() => console.log('Cant connect to db...'))
const routes = express.Router();
const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 5,
        maxlength: 60,
        required: true
    },
    isGold: {
        type: Boolean,
        required: true
    },
    contactNumber: {
        type: Number,
        required: true
    },
    loggedDate: {
        type: Date,
        default: Date.now
    }
});
const Customer = mongoose.model('customer-api', customerSchema);
routes.get('/', async(req, res) => {
    const customers = await Customer.find().sort('name');
    console.log(customers);
    res.send(customers)
});
routes.delete('/:id', async(req, res) => {
    const customers = await Customer.findOneAndDelete();
    if (!customers) return res.status(404).send('Request Time Out..');
    res.send(customers);
    console.log(customers)
});
routes.put('/:id', async(req, res) => {
    const customers = validateCustomer(req.body);
    // console.log(req.body.name)
    // JSON.stringify(req.body)no
    if (!customers) return res.status(400).send('Invalid Request Sent...');
    const customer = await Customer.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        // contactNumber: req.body.contactNumber
    }, { new: true });
    if (!customer) return res.status(404).send('Request Time Out...');
    res.send(customer)

    let customer = new Customer({
        name: req.body.name,
        contactNumber: req.body.contactNumber,
        isGold: req.body.isGold
    });
    customer = await customer.save();
    res.send(customer)

})

function validateCustomer(customer) {
    const schema = {
        name: joi.string().min(5).max(60).required(),
        // contactNumber: joi.number().min(5).max(20).required()
    };
    const result = joi.validate(customer, schema);
    console.log(result);
    // console.log("hi");
    return result

}




module.exports = routes;