const express = require('express');
const { authadmin, authuser } = require('../middleware/auth.middleware');
const authmiddleware = require('../middleware/auth.middleware')
const { createitem, getitem } = require('../controller/item.controller'); // ✅ destructure correctly
const multer = require('multer');
const itemcontroller = require('../controller/item.controller')


const router = express.Router();

const upload = multer({
    storage: multer.memoryStorage(),
});

router.post(
    '/',
    authmiddleware.authadminmiddleware,
    upload.single('video'),
    itemcontroller.createitem
);

router.get(
    '/',

    itemcontroller.getitem
);

module.exports = router;
