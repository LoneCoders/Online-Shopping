const express = require('express');
const router = express.Router();
const viewController = require('./../controller/viewController');
const authController = require('./../controller/authController');

// routes
router.get('/', authController.isLoggedIn, viewController.getOverview);
router.get('/grocery', viewController.getGrocery);
router.get('/dress', viewController.getDress);
router.get('/electronics', viewController.getElectronics);
router.get('/furniture', viewController.getFurniture);
router.get('/gadgets', viewController.getGadgets);
router.get('/signUp', viewController.getSignUp);
router.get('/login', viewController.getLogin);
module.exports = router;
