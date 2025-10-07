const mongoose = require('mongoose')

const userschema = new mongoose.Schema({


    fullname: {
        required:true,
        type:String,
    },
    email:{
        unique:true,
        required:true,
        type:String,

    },
    password:{
         minLength:8,
        required:true,
        type:String,

    },
     
},
{
    timestamps: true,
  },

)

const usermodel =  mongoose.model("user" , userschema);

module.exports = usermodel;