const express = require('express');
const productController = require('../controller/productController');
const router = express.Router();

router
  .route('/')
  .get(productController.getAll)
  .post(productController.createProduct);

module.exports = router;
