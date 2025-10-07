const { model } = require('mongoose');
const itemmodel = require('../model/item.mode');
const uploadfile = require('../services/storage.services');
const { v4: uuid } = require('uuid');
const uploadFile = require('../services/storage.services');

const createitem = async (req, res) => {
  try {

    // console.log ( req. admin)
// console.log ( req. body)
// console.log ( req. file)
// const fileUploadResult = await uploadFile(req.file.buffer, uuid( ) )
// console.log(fileUploadResult)
// res.send(fileUploadResult)

// res.send(" item created")// console.log ( req. admin)
// console.log ( req. body)
// console.log ( req. file)
// const fileUploadResult = await uploadFile(req.file.buffer, uuid( ) )
// console.log(fileUploadResult)

// res.send(" item created")



    // upload file to ImageKit
   const fileUploadResult = await uploadFile(req.file.buffer, uuid( ) )

    // create item in DB
    const fileItem = await itemmodel.create({
     itemname: req. body. name,
description: req.body. description,
video: fileUploadResult.url,
admin: req.admin._id,  
storeLink:req.body.storeLink 

    
    });

    console.log(fileItem)

    return res.status(201).json({
      message: "Item uploaded successfully",
      item: fileItem
    });
  } catch (error) {
    console.error("Error creating item:", error);
    return res.status(500).json({ message: "Error creating item", error });
  }
};

const getitem = async (req, res) => {
  try {
    const items = await itemmodel.find({}); 
  

    return res.status(200).json({
      message: "Items fetched successfully",
      items
    });
  } catch (error) {
    console.error("Error fetching items:", error);
    return res.status(500).json({
      message: "Error fetching items",
      error
    });
  }
};


module.exports = {
  createitem,
  getitem
};
