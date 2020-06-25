const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');
const joi = require('joi')
mongoose.connect("mongodb://localhost/vidly", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    // .then(() => console.log('Connected...'))
    // .catch(err => console.log('cant connect ...'));

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.method.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id }, config.get('jwtPrivateKey'));
    return token
}
const User = mongoose.model('users', userSchema);


// module.exports = validateUser();
// module.exports = userSchema;
module.exports = User;
// module.exports = generateAuthToken