const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  // find all user in users collection
  const allUsers = await User.find();
  res.status(200).json({
    status: 'success',
    result: allUsers.length,
    data: {
      data: allUsers,
    },
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  // get user by id
  const user = await User.findById(req.params.id);
  res.status(200).json({
    status: 'success',
    data: {
      data: user,
    },
  });
});
