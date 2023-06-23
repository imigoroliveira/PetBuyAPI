const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const clientSchema = new mongoose.Schema({
    code: String,
    profileImage: {
        type: Buffer,
    },
    fullName: String,
    address: String,
    tel: String,
    cpf: String,
    creditCardName: String,
    creditCardNumber: String,
    creditCardCvc: String,
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    token: {
        type: String,
        select: false
    }
});

clientSchema.pre('save', async function (next) {
    const hash = await bcryptjs.hash(this.password, 10);
    this.password = hash;
    next();
  });
  
module.exports = mongoose.model('client', clientSchema);