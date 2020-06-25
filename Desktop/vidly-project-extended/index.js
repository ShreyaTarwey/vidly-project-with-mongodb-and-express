const express = require('express');
const joi = require('joi');
const mongoose = require('mongoose');
const { customerRoutes } = require('./routes/customers.js');
const { genreRoutes } = require('./routes/genres.js');
const { movieRoutes } = require('./routes/movies.js');
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const config = require('config')
mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);
mongoose.connect('mongodb://localhost/vidly')
    .then(() => console.log("Connected to mongodb..."))
    .catch(err => console.log('Cant connect to mongodb...'));

const app = express();
if (!config.get('jwtPrivateKey')) {
    console.error('Fatal');
    process.exit(1)
}
app.use(express.json());
app.use('/api/genres', genreRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/users', userRoutes);
app.use('/api/login', authRoutes)

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`))