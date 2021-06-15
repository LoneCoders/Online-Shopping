const jwt = require('jsonwebtoken');
const { findOne } = require('./../models/userModel');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/AppError');

const signToken = (id, statusCode, res) => {
  // signing json web token
  const token = jwt.sign({ _id: id }, process.env.JWT_SECRET_STRING, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  // send token to user
  res.status(statusCode).json({
    status: 'success',
    token: token,
  });
};

exports.signUp = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);
  signToken(newUser._id, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  // get email and password from body
  const { email, password } = req.body;

  // check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }

  // check if user exist emialId and password are correct
  const user = await User.findOne({ email }).select('+password');

  // check if user exist in DB and check password
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  // if everything okay then send token
  const token = signToken(user._id, 200, res);
});
