const usermodel = require("../model/user.model")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const { model } = require("mongoose")
const adminmodel = require("../model/admin.model")

// usercontroller
 const registercontroller = async(req,res)=>{
    try {
        
 let {fullname , email , password} = req.body

 const existinguser = await usermodel.findOne({email})

 if(existinguser){
    return res.status(409).json({
        message:"user already exist"
    })
 }


 const hasspass = await bcrypt.hash(password , 10) 

 let newuser = await usermodel.create({
    fullname,email,password : hasspass,
 })

let token  = jwt.sign({id:newuser._id} , process.env.secret_key  , {
    expiresIn:"1h"
})



res.cookie('token' , token)

return res.status(200).json({
    message:"user registered",
    user:newuser
})

    } catch (error) {
        console.log("error in registration" , error)
        
    }
}



const logincontrolller = async (req,res) =>{
    try {
        
       let { email , password}= req.body

       let user = await usermodel.findOne({email})


       if(!user){
        return res.status(404).json({
            message:"user not found !"
             })
       }

       let comparepass = await bcrypt.compare(password , user.password)

       if(!comparepass){
        return res.send(404).json({
            message:"invalid credential"
        })
       }

       const token = jwt.sign({id:user._id} , process.env.secret_key , {
        expiresIn:'1h'
       })

       res.cookie("token" , token)

       return res.status(200).json({
        message:"user logged in !",
        user:user,
       })


    } catch (error) {
        
        console.log("error in login" , error)
    }
}


const logoutcontroller = async (req, res)=>{

    try {

        let token  = req.cookie.token;

        if(!token){
            return res.status(404).json({
                message:"token not found !"
            })
        }
        
       res.clearCookie("token");
       return res.status(200).json({
        message:"user logged out !"
       })


    } catch (error) {
      console.log("error in logout !",error)        
    }



}


// admin controller

const adminregistercontroller = async (req , res) =>{
    try {


        let { fullname,
    BusinessName,
    phone,
    address,
    email,
    password
    } = req.body;
        
        let existingadmin = await adminmodel.findOne({email})

        if(existingadmin){
            return res.status(409).json({
                message:"admin already exist"

            })
        }

        let hasspass = await bcrypt.hash(password , 10)

        let admin = await adminmodel.create({
            fullname ,BusinessName , address,phone , email ,  password:hasspass
        })

        let token = jwt.sign({id:admin._id}, process.env.secret_key , {
            expiresIn:"1h",
        }  )

        res.cookie("token" , token)

        return res.status(200).json({
            message:"admin registered",
            newadmin:{
                _id: admin._id,
                email: admin.email,
                BusinessName: admin.BusinessName,
            fullname: admin.fullname,
            address: admin.address,
            contactName: admin.contactName,
            phone: admin.phone

            }
        })

        
    } catch (error) {
        console.log("error in admin register !" , error )
    }

}


const adminlogincontroller = async (req,res) => 
    {
    try {
        let { email, password } = req.body;

        let admin = await adminmodel.findOne({ email });

        if (!admin) {
            return res.status(404).json({
                message: "admin not found"
            });
        }

        let comparepass = await bcrypt.compare(password, admin.password);

        if (!comparepass) {
            return res.status(401).json({
                message: "invalid password",
            });
        }

        let token = jwt.sign({ id: admin._id }, process.env.secret_key, {
            expiresIn: '1h',
        });

        res.cookie("token", token);

        return res.status(200).json({
            message: "admin logged in successfully",
            admin: {
                email: admin.email,
                password: admin.password,
                _id: admin._id
            }
        });
    } catch (error) {
        console.log("error in login admin", error);
    }



        
    }



module.exports = {
    registercontroller,
    logincontrolller,
    logoutcontroller,
    adminregistercontroller,
    adminlogincontroller,
    


} ;
