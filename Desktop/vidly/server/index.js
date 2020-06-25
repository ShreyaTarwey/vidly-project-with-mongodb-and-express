const express = require('express');
const Joi = require('joi');
const app = express();

const genres = [
    { id: 1, genreName: 'Action' },
    { id: 2, genreName: 'Romantic' },
    { id: 3, genreName: 'Comedy' }
]
app.get('/api/genres/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) {
        res.status(404).send('Not Found');
    }
    res.send(genre);
});
app.delete('/api/genres:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) {
        res.status(404).send('Not Found')
    }
})
app.listen(6000)