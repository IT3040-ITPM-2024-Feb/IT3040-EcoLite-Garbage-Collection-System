const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    firstName:{
        type:String,
        required:false,
    }, 
    lastName:{
        type:String,
        required:false,
    },
    phone:{
        type:String,
    },
    address:{
        type:String,
    }, 
    subscribedCompany: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null } // Refers to the buyer representing the company
});

const Seller = mongoose.model('Seller', sellerSchema);

module.exports = Seller;