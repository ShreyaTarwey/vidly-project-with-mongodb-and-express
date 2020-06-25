const express = require('express');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const joi = require('joi');
const mongoose = require('mongoose');
const User = require('../models/user');
console.log(User);

const validateUser = user => {
    const schema = {
        name: joi.string().required(),
        email: joi.string().required().email(),
        password: joi.string().required()
    };
    const result = joi.validate(user, schema);

    return result;
};
console.log(validateUser)

mongoose.connect("mongodb://localhost/vidly", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const userRoutes = express.Router();

userRoutes.get('/:id', async(req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(400).send('Invalid User...');

    res.send(user)
});

userRoutes.delete('/:id', async(req, res) => {
    const user = await User.findByIdAndRemove(req.params.id);
    if (!user) return res.status(400).send('Invalid User...');

    res.send(user)

});

userRoutes.put('/:id', async(req, res) => {
    const { err } = validateUser(req.body);
    if (err) return res.status(400).send('Bad Request...');

    let user = await new User.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }, {
        new: true
    });

    if (!user) return res.status(404).send('Request Time Out...')
    res.send(user)
});

userRoutes.post('/', async(req, res) => {
    const { err } = validateUser(req.body);
    if (err) return res.status(400).send('Bad Request...');

    let user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });


    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt)
    user = await user.save();
    if (!user) return res.status(404).send('Request Time Out...')
    res.send(_.pick(user, ['id', 'name', 'email']))

});

module.exports = userRoutes;