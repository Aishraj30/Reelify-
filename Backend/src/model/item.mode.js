const mongoose = require('mongoose')

const itemschema = new mongoose.Schema({
    itemname:{
        required: true,
        type:String,

    },
    video:{
        required:true,
        type:String,
        

    },
    description:{
        type:String,
        required:true,
    },
    itempartner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'admin'
    },
    storeLink: {
  type: String,
  required: true
}


})

const itemmodel = mongoose.model('item' , itemschema);

module.exports = itemmodel ;