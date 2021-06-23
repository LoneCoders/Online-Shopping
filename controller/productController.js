const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const Product = require('./../models/productModel');

// get all products
exports.getAll = catchAsync(async (req, res) => {
  const products = await Product.find();
  res.status(200).json({
    status: 'success',
    result: products.length,
    data: {
      data: products,
    },
  });
});

// create a product
exports.createProduct = catchAsync(async (req, res, next) => {
  const newProduct = await Product.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      data: newProduct,
    },
  });
});
