const express = require("express");
const productController = require("./../controller/productController");
const productRouter = express.Router();

productRouter.get("/", productController.home);

productRouter.get("/dress", productController.dress);

productRouter.get("/electronics", productController.electronics);

productRouter.get("/furniture", productController.furniture);

productRouter.get("/gadgets", productController.gadgets);

module.exports = productRouter;
