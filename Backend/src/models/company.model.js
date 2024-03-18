const mongoose = require('mongoose');

const buyerSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    companyName: String,
    numberOfCenters: Number,
    companySlogan: String,
    companyAbout: String,
    openHours: String,
    closeHours: String,
    companyImage: String,
});

const Buyer = mongoose.model('Buyer', buyerSchema);

module.exports = Buyer;