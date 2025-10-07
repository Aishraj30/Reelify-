const express = require('express');
const { authadminmiddleware } = require('../middleware/auth.middleware');
const { getadminbyid } = require('../controller/admin.controller');
const adminmiddleware = require("../middleware/auth.middleware")
const admincontroller = require("../controller/admin.controller")

const router = express.Router();

router.get("/:id" ,   adminmiddleware.authadminmiddleware, admincontroller.getadminbyid  )


module.exports = router