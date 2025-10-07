const express = require('express');
const {registercontroller , logincontrolller , logoutcontroller, adminregistercontroller, adminlogincontroller}= require('../controller/auth.controller');


const router = express.Router();


//user routes
router.post('/register' , registercontroller )
router.post('/login' , logincontrolller)
router.post('/logout' , logoutcontroller)

//admin routes
router.post('/adminregister' , adminregistercontroller)
router.post('/adminlogin' , adminlogincontroller ) 





module.exports = router

