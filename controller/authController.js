const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');

exports.signUp = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);

  // signing json web token
  const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET_STRING, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  // send token to user
  res.status(201).json({
    status: 'success',
    token: token,
  });
});
