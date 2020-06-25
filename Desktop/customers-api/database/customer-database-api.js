const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb://localhost/customer-api')
    .then(() => console.log('Connected To mongodb...'))
    .catch((err) => console.log(new Error().message));
const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 5,
        maxlength: 60,
        required: true
    },
    isGold: {
        type: Boolean,
        required: true
    },
    contactNumber: {
        type: Number
    },
    loggedDate: {
        type: Date,
        default: Date.now
    }
});
const Customer = mongoose.model('customer-api', customerSchema);
async function createCustomer() {
    const customer = new Customer({
        name: 'Hydra',
        isGold: false,
        contactNumber: 7404726346
    });
    const result = await customer.save();
    console.log(result)
};
createCustomer()