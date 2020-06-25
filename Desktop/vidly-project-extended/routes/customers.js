const express = require('express');
const joi = require('joi');
const mongoose = require('mongoose');
const Customer = require('../models/customer');
const validateCustomer = require('../models/customer')
const customerRoutes = express.Router();

customerRoutes.get('/:id', async(req, res) => {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(400).send("Bad request...");

    res.send(customer);
    console.log(customer)
});

customerRoutes.delete('/:id', async(req, res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id);
    if (!customer) return res.status(400).send('Bad request...');

    res.send(customer);
    console.log(customer)
});

customerRoutes.put('/:id', async(req, res) => {
    const err = validateCustomer(req.body);
    if (err) return res.status(400).send('Bad Request...');

    const customer = await Customer.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        isGold: req.body.isGold,
        contactNumber: req.body.contactNumber
    }, {
        new: true
    });
    if (!customer) return res.status(404).send('Request Time Out...');

    res.send(customer);
    console.log(customer)
});

customerRoutes.post('/', async(req, res) => {
    // const err = validateCustomer(req.body);
    // if (err) return res.status(400).send('Bad Request...');
    // // console.log(err)
    let customer = new Customer({
        name: req.body.name,
        isGold: req.body.isGold,
        contactNumber: req.body.contactNumber
    });
    customer = await customer.save()
    if (!customer) return res.status(404).send('Request Time Out...');

    res.send(customer);
    console.log(customer)
});

module.exports.customerRoutes = customerRoutes;