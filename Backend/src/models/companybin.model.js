const mongoose = require('mongoose');

const binSchema = new mongoose.Schema({
    BinName:{
        type:String,
        unique:true,
    },
    BinID:{
        type:Number
    },
    BinLocation:{
        type:String,
        required:false,
    }, 
    BinOpenTime:{
        type:String,
    }, 
    BinCloseTime:{
        type:String,
    }, 
    
},{
    timestamps:true,
});

const Bin = mongoose.model('Bin', binSchema);

module.exports = Bin;