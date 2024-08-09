const Firm = require ('../model/Firm');
const Vendor = require ('../model/Vendor');
const multer = require ('multer');
const path = require('path')




const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });

  const upload = multer({storage:storage});


const addFirm = async(req, res)=>{
    try{
        const {firmName,area,category,region,offer} = req.body;
        const image = req.file? req.file.filename:undefined;
        const vendor = await Vendor.findById(req.vendorId);
        if(!vendor){
            return res.status(404).json({error:"vendor not found"})
        }

    const newfirm = new Firm({
        firmName,
        area,
        category,
        region,
        offer,
        image,
        vendor:vendor._id
    })
    const savedFirm = await newfirm.save();

    vendor.firm.push(savedFirm);

    await vendor.save();


    res.status(200).json({message:"firm added successfully"})


    }catch(error){
        console.error(error);
        res.status(500).json({error:"internal server error"})

    }
}

const deletefirmById = async(req, res)=>{
  try{
      const firmId = req.params.firmId;
      const deletefirm = await Firm.findByIdAndDelete(firmId);

      if(!deletefirm){
          return res.status(404).json({error:"no firm found"})
      }

  }catch(error){
      console.error(error);
      res.status(404).json({error:"internal server error"})

  }
}
module.exports = {addFirm: [upload.single('image'),addFirm],deletefirmById}