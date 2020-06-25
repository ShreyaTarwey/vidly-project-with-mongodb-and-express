const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/crud-api")
    .then(() => console.log('Connected to mongodb...'))
    .catch(() => console.log('Cant connect to mongo db...'));
const schema = new mongoose.Schema({
    userName: {
        type: String,
        minlength: 4,
        maxlength: 65,
        required: true
    },
    emailId: {
        type: String,
        match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        required: true
    },
    contactNumber: {
        type: Number,
        match: /^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}/,
        required: true
    },
    premiumMember: {
        type: Boolean,
        required: true
    }
});
const User = mongoose.model('crud-api', schema);

async function createUser() {
    const user = new User({
        userName: 'Kratika',
        emailId: 'lit2019061@iiitl.ac.in',
        contactNumber: 9215193100,
        premiumMember: true
    });
    const result = await user.save();
    console.log(result)
};
createUser()