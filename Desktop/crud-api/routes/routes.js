const express = require('express');
const joi = require('joi');
const mongoose = require('mongoose');

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/crud-api")
    .then(() => console.log('Connected to mongodb...'))
    .catch(() => console.log('Cant connect to mongodb...'))

const routes = express.Router();
const schema = new mongoose.Schema({
    userName: {
        type: String,
        minlength: 4,
        maxlength: 65,
        required: true
    },
    emailId: {
        type: String,
        match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        required: true
    },
    contactNumber: {
        type: Number,
        match: /^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}/,
        required: true
    },
    premiumMember: {
        type: Boolean,
        required: true
    }
});
console.log(typeof(schema))
const User = mongoose.model('crud-api', schema);
console.log(typeof(User))
let user = new User({
    name: 'r',
    emailId: 'c',
    contactNumber: 'b',
    premiumMember: 'a'
});
console.log(typeof(user))
routes.get('/:id', async(req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send('Invalid Request...');

    res.send(user);
    console.log(user)
});
routes.delete('/:id', async(req, res) => {
    const user = await User.findByIdAndRemove(req.params.id);
    if (!user) return res.status(404).send('Invalid Request...');

    res.send(user);
    console.log(user)
});
routes.post('/', async(req, res) => {
    const error = validateUser(req.body);
    if (error) return res.status(400).send('Bad Request...');

    let user = new User({
        userName: req.body.userName,
        emailId: req.body.emailId,
        contactNumber: req.body.contactNumber,
        premiumMember: req.body.premiumMember
    });
    user = await user.save();
    res.send(user);
    console.log(user)
});
routes.put('/:id', async(req, res) => {
    const error = validateUser(req.body);
    if (error) return res.status(400).send('BAd Request...');

    const user = await User.findByIdAndUpdate(req.params.id, {
        userName: req.body.userName
    }, {
        new: true
    });
    if (!user) return res.status(404).send("Request Time Out...");

    res.send(user);
    console.log(user)
})

function validateUser(user) {
    const schema = {
        userName: joi.string().min(4).max(65).required(),
        emailId: joi.string().required(),
        contactNumber: joi.number().required(),
        premiumMember: joi.boolean().required()
    }
    const result = joi.validate(user, schema);
    console.log(result);
}



// module.exports = routes;
module.exports = routes;