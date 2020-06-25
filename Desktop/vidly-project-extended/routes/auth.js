const express = require('express');
const joi = require('joi');
const mongoose = require('mongoose');
const _ = require('lodash');
const bcrypt = require('bcrypt');
// const generateAuthtoken = require('../models/user');
// console.log(typeof(generateAuthtoken))
mongoose.connect('mongodb://localhost/logins', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    // .then(() => console.log('Connectd'))
    // .catch(() => console.log('failed to connect to mongodb...'));
const User = require('../models/user');
const authRoutes = express.Router();

authRoutes.get('/:id', async(req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(400).send('Bad Request...');

    res.send(user);

});

authRoutes.delete('/:id', async(req, res) => {
    const user = await User.findByIdAndRemove(req.params.id);
    if (!user) return res.status(400).send('Bad Request...');

    res.send(user);

});

authRoutes.post('/', async(req, res) => {
    const { err } = validate(req.body);
    if (err) return res.status(404).send('Invalid Request...');

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Invalid Email or password...');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(404).send('Incorrect Password....');
    // console.log(typeof(user.generateAuthtoken())
    console.log(typeof(user.generateAuthToken()))
        // res.send(token)
});

authRoutes.put('/:id', async(req, res) => {
    const err = validate(req.body);
    if (err) return res.status(404).send('Invalid Request...');

    const user = await User.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        email: req.body.name
    }, {
        new: true
    });
    if (!user) return res.status(400).send('Bad Request....')

    res.send(user)
})




function validate(user) {
    const schema = {
        email: joi.string().required(),
        password: joi.string().required()
    };
    const result = joi.validate(user, schema);

    return result
};

module.exports = authRoutes