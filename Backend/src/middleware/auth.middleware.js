const jwt = require("jsonwebtoken");
const adminmodel = require("../model/admin.model");
const usermodel = require('../model/user.model')

const authadminmiddleware = async (req, res, next) => {
  try {
    // Get token from cookies OR headers
    const token =
      req.cookies?.token   
      

    if (!token) {
      return res.status(401).json({
        message: "No token found, authorization denied",
      });
    }

    // Verify token
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    
    if (!decode) {
      return res.status(401).json({
        message: "Invalid token",
      });
    }
    
    // Find admin
    const admin = await adminmodel.findById(decode.id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    
    req.admin = admin;
    next();
  } catch (error) {
    console.log("Error in admin middleware:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


const authusermiddleware = async(req , res, next) =>{
  try {
    
    const token  = req.cookies?.token;
    
    if(!token) {
      return res.status(404).json({
        message:'please log in user please'
        
      })
    }
    
    const decode = jwt.verify(token, process.env.SECRET_KEY);

    if(!decode) {
      return res.status(404).json({
        message:"invalid token"
      })


       
    }

    const user = await usermodel.findById(decode.id)

    if(!user) {
      return res.status(404).json({
        message:'user not found'
      })
    }
    

    req.user = user,
    next();

  } catch (error) {

    console.log('errror in user token' , error)
    
  }
}

module.exports = {
  authadminmiddleware,
  authusermiddleware
};
