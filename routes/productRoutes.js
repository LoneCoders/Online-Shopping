const express = require('express');
const productController = require('../controller/productController');
const router = express.Router();

router.get('/', productController.home);

router.get('/dress', productController.dress);

router.get('/electronics', productController.electronics);

router.get('/furniture', productController.furniture);

router.get('/gadgets', productController.gadgets);

module.exports = router;
