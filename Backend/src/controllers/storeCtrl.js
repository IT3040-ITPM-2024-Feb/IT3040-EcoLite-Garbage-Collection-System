const Item = require('../models/store.model');

const createItem = async(req,res) =>{
    const itemId = req.body.itemId;
    const findItem = await Item.findOne({itemId:itemId});

    if(!findItem){
        const newItem = Item.create(req.body);
        res.json(newItem);
    }else{
        res.json({msg:'Item is already Added',success:false})
    }
}

const getAllItems =async(req,res)=>{
    try {
        const AllItem = await Item.find();
        res.json(AllItem)
    } catch (error) {
        res.status(400).json(error)
    }
}

const updateItem = async(req,res)=>{
    console.log('sample');
}





module.exports ={createItem,getAllItems,updateItem};