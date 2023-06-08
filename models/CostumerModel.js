const mongoose = require('mongoose');

const subscriberSchema = new mongoose.Schema({
    code: String,
    profileImage: Buffer,
    fullName: String,
    address: String,
    tel: String,
    cpf: String,
    creditCardNumber: String,
    email: String,
    password: String
});

module.exports = mongoose.model('subscriber', subscriberSchema);