const express = require('express');
const joi = require('joi');
const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/crud-api")
    .then(() => console.log('Connected to mongodb...'))
    .catch(() => console.log('Cant connect to mongodb...'))
const routes = require('./routes')
const app = express();

app.use(express.json());
app.use('/api/users', routes)


const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}...`))