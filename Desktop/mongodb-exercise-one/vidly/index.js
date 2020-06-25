// Required Packages 
const express = require('express');
const mongoose = require('mongoose');
const joi = require('joi');
// Few Important variables 
const app = express();
app.use(express.json())
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb://localhost/vidly-project');
// Schema 
const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 5,
        maxlength: 50,
        required: true
    }
});
const Genre = mongoose.model('genres', genreSchema);
// Validation Genre using func
function validateGenre(genre) {
    const schema = {
        name: joi.string().min(3).max(50).required()
    }
    return joi.validate(genre, schema)
}
//Handling Routes
app.get('/api/genre/:id', async(req, res) => {
    const genres = await Genre.findById(req.params.id);
    res.send(genres)
});
app.put('/api/genre/:id', async(req, res) => {
    const error = validateGenre(req.body);
    if (error) return res.status(404).send('Request Timeout....')
    const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });
    if (!genre) return res.status(400).send('No Output..');
    res.send(genre)

})
app.delete('/api/genre/:id', async(req, res) => {
    const genre = Genre.findByIdAndRemove(req.params.id);
    if (!genre) return res.status(400).send('No Output...');
    res.send(genre)
})





const port = process.env.PORT || 3000;
app.listen(port);
console.log('Listening on port ' + port + ' ...')