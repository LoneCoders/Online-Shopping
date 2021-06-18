const express = require('express');
const router = express.Router();
const viewController = require('./../controller/viewController');

// routes
router.get('/', viewController.getOverview);
router.get('/grocery', viewController.getGrocery);
router.get('/dress', viewController.getDress);
router.get('/electronics', viewController.getElectronics);
router.get('/furniture', viewController.getFurniture);
router.get('/gadgets', viewController.getGadgets);

module.exports = router;
