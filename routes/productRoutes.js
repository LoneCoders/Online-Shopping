const express = require('express');
const productController = require('../controller/productController');
const authController = require('./../controller/authController');
const router = express.Router();

router
  .route('/')
  .get(authController.protect, productController.getAll)
  .post(productController.createProduct);

module.exports = router;
