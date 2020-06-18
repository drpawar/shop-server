const express = require('express');
const router = express.Router();
const productCtrl = require('../controllers/productController');

router.get('/getProduct', productCtrl.getProduct)
router.post('/newProduct', productCtrl.addProduct)

module.exports = router;