const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    firstName:{
        type:String,
        unique:true,
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
    subscribedCompany: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', default: null } 
});

const Seller = mongoose.model('Seller', sellerSchema);

module.exports = Seller;