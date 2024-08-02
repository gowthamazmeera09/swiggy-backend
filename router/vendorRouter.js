const express = require('express');
const vendorController = require ('../controller/vendorController');


const router = express.Router();

router.post('/Register',vendorController.vendorRegister);
router.post('/Login',vendorController.vendorLogin);

router.get('/all-vendors',vendorController.getAllVendors);
router.get('/single-vendor/:gowtham',vendorController.getvendorById)

module.exports = router;