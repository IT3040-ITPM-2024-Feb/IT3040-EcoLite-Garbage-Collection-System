const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    firstName: String,
    lastName: String,
    phone: String,
    address: String,
    subscribedCompany: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null } // Refers to the buyer representing the company
});

const Seller = mongoose.model('Seller', sellerSchema);

module.exports = Seller;