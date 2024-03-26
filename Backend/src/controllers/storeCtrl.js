const Item = require('../models/store.model');

const createItem = async(req,res)=>{
    const itemId = req.body.itemId;
    const findItem = await Item.findOne({itemId:itemId});
    if(!findItem){
      try{
        const newItem = await Item.create(req.body);
        const {itemId,itemName,companyName,itemAmount,itemDescription,itemImage} = newItem;              
            
                res.json({
                   newItem,                   
                    success:true,
                    msg:'Item Is Added Successfully!'
                  });

      }catch(error){
         res.status(500).json({msg:'Error for Adding an Item',success:false});
      }
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
const getAItem = async(req,res)=>{
    const {id} = req.params;
    try{
        const getAItem = await Item.findById(id);
        res.json({getAItem});

    }catch(error){
        res.status(402).json(error)
    }
}

const updateItem = async(req,res)=>{
    const {id} = req.params;
    console.log(id);
    try{
        const updateItem = await Item.findByIdAndUpdate(
            id,
            {
                itemId:req?.body?.itemId,
                itemName:req?.body?.itemName,
                companyName:req?.body?.companyName,
                itemAmount:req?.body?.itemAmount,
                itemDescription:req?.body?.itemDescription,
                itemImage:req?.body?.itemImage,
            },
            {
                new:true,
            }
        );
        res.json(updateItem)
    }catch(error){
         res.status(404).json(error)
    }
}

//Delete A Item
const deleteItem = async(req,res) =>{
    const {id} = req.params;
    try{
      const deleteItem = await Item.findByIdAndDelete(id);
      res.json({msg:'Item Deleted Successfully!',deleteItem});
    }catch(error){
        res.status(402).json(error);
    }
}






module.exports ={createItem,getAllItems,getAItem,updateItem,deleteItem};