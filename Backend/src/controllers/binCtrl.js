const Bin = require('../models/companybin.model');

const createBin = async(req,res) =>{

   const { binName, binID, binLocation,binOpenTime, binCloseTime} = req.body;

    const newBin = new Bin({
        binName,
        binID,
        binLocation,
        binOpenTime,
        binCloseTime
    });
    newBin
        .save()
        .then((createBin) => {
            res.json({createBin,msg:'Company Bin Successfully Created!',success:true})
        })
        .catch((error) => {
            res.status(400).json(error)
        })

}

const getAllBins =async(req,res)=>{
    console.log('Sample Txt');
    try {
        const AllBin = await Bin.find();
        res.json(AllBin)
    } catch (error) {
        res.status(400).json(error)
    }
}

module.exports ={createBin,getAllBins};

