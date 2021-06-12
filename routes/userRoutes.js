const express = require('express');
const authController = require('./../controller/authController');
const router = express.Router();
const userController = require('./../controller/userController');
router.post('/signUp', authController.signUp);

router.route('/').get(userController.getAllUsers);
router.route('/:id').get(userController.getUser);
//   .patch(userController.updateUser)
//   .delete(userController.deleteUser);
module.exports = router;
