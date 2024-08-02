
const Vendor = require ('../model/Vendor');
const jwt = require ('jsonwebtoken');
const dotEnv = require ('dotenv');

dotEnv.config();

const secretKey = process.env.MyNameIsMyKey;

const verifyToken = async (req, res, next)=>{
    const token = req.headers.token;

    if(!token){
        return res.status(401).json({message:"Token is required"});
    }
    try{
        const decoded = jwt.verify(token,secretKey);

        const vendor = await Vendor.findById(decoded.vendorId);

        if(!vendor){
            return res.status(401).json({error:"vendor not Found"})
        }

        req.vendorId = vendor._id

        next()


    }catch(error){
        console.error(error);
        res.status(404).json({error:"invalid token"})
    }
}

module.exports = verifyToken;