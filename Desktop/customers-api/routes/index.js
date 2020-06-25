const express = require('express');
const joi = require('joi');
const mongoose = require('mongoose');
const routes = require('./routes')

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb://localhost/customer-api')
    .then(() => console.log('Connected to Mongo db...'))
    .catch(() => console.log('Cant connect to db...'))
const app = express();
app.use(express.json());
app.use('/api/customers', routes)
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}....`));