// const mongoose = require('mongoose');

// const StoreItemSchema = new mongoose.Schema({
//     itemId:{
//         type:String,
//         required:true,
//     },
//     itemName:{
//         type:String,
//         required:true,
//         // unique:true,
//     },
//     companyName:{
//         type:String,
//         required:true,
//     }, 
//     itemAmount:{
//         type:String,
//         required:true,
//     }, 
//     itemDescription:{
//         type:String,
//     }, 
//     itemImage:{
//         type:String,
//         required:true
// },


// });

// const item = mongoose.model('Item', StoreItemSchema);

// module.exports = item;


const mongoose = require('mongoose');

 const StoreItemSchema = new mongoose.Schema({
    itemId:{
         type:String,
      required:true,
     },
    itemName:{
        type:String,
        required:true,
     },
     companyName:{
        type:String,
        required:true,
    }, 
    itemAmount:{
        type:String,
        required:true,
    }, 
    itemDescription:{
         type:String,
    }, 
    itemImage:{     
        type:String,
        required:true },

});
 const item = mongoose.model('Item', StoreItemSchema);

 module.exports = item;

