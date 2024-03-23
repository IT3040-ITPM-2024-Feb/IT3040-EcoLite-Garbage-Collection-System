const mongoose = require('mongoose');

const binSchema = new mongoose.Schema({
    binName:{
        type:String,
        required:true
    },
    binID:{
        type:String,
        // unique:true
    },
    binLocation:{
        type:String,
        required:false,
    }, 
    binOpenTime:{
        type:String,
    }, 
    binCloseTime:{
        type:String,
    }, 
    
},{
    timestamps:true,
});

const Bin = mongoose.model('Bin', binSchema);

module.exports = Bin;