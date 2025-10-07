const mongoose = require('mongoose')

const adminschema = new mongoose.Schema({
   fullname: {
        type: String,
        required: true
    },
    BusinessName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
    
},{
    timestamps:true,
})

const adminmodel = mongoose.model('admin' , adminschema)

module.exports = adminmodel