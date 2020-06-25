const express = require('express');
const auth = require('../middleware/auth')
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/vidly')
    .then(() => console.log('Connected '))
const Genre = require('../models/genres');

const validateGenre = require("../models/genres")

const genreRoutes = express.Router();

genreRoutes.get('/:id', auth, async(req, res) => {
    const genre = await Genre.findById(req.params.id);
    if (!genre) return res.status(400).send('Bad Request..');

    res.send(genre)
});

genreRoutes.delete('/:id', async(req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);
    if (!genre) return res.status(400).send('Bad Request..');

    res.send(genre)
});

genreRoutes.post('/', auth, async(req, res) => {
    // const err = validateGenre(req.body);
    // console.log(err)
    // if (err) return res.status(400).send('Bad Request..');

    let genre = new Genre({
        name: req.body.name
    });
    console.log(genre)
    genre = await genre.save();
    if (!genre) return res.status(404).send('Request Timeout...');

    res.send(genre)
});

genreRoutes.put('/:id', async(req, res) => {
    const { err } = validateGenre(req.body);
    if (err) return res.status(400).send('Bad Requset..');

    const genre = await Genre.findByIdAndUpdate(req.params.id, {
        name: req.body.name
    }, {
        new: true
    });
    if (!genre) return res.status(404).send('Request Timeout...');

    res.send(genre)
});

module.exports.genreRoutes = genreRoutes;