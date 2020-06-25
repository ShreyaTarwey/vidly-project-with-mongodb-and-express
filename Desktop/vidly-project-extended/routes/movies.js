const express = require('express');
const joi = require('joi');
const mongoose = require('mongoose');
const Movies = require('../models/movies');
const Genre = require('../models/genres')
const validateMovie = require('../models/movies')

const movieRoutes = express.Router();

movieRoutes.get('/:id', async(req, res) => {
    const movie = await Movies.findById(req.params.id);
    if (!movie) return res.status(400).send('Bad Request...');

    res.send(movie)
});

movieRoutes.delete('/:id', async(req, res) => {
    const movie = await Movies.findByIdAndRemove(req.params.id);
    if (!movie) return res.status(400).send('Bad Request...');

    res.send(movie)
});

movieRoutes.put('/:id', async(req, res) => {
    const { err } = validateMovie(req.body);
    if (err) return res.status(400).send('Bad Request...');

    const genre = await Genre.findById(req.body.genreId)
    if (!genre) return res.status(404).send('request Timeout...');
    let movie = await Movies.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    }, {
        new: true
    });

    // if (!movie) return res.status(404).send('Request Time Out...');

    res.send(movie);

    console.log(movie)

});

movieRoutes.post('/', async(req, res) => {
    const { err } = validateMovie(req.body);
    if (err) return res.status(400).send('Bad Request...');

    const genre = await Genre.findById(req.body.genreId)
    console.log(genre)
        // if (!genre) return res.status(404).send('request Timeout...');
    let movie = new Movies({
        name: req.body.name,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });
    movie = await movie.save();


    res.send(movie)
});


module.exports.movieRoutes = movieRoutes;