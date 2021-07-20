const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { promisify } = require('util');
const { findOne } = require('./../models/userModel');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/AppError');
const sendEmail = require('../utils/email');

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOption = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === 'production') cookieOption.secure = true;
  res.cookie('jwt', token, cookieOption);
  res.status(statusCode).json({
    status: 'success',
    token: token,
  });
};

//SIGN TOKEN
const signToken = (id) => {
  // signing json web token
  const token = jwt.sign({ _id: id }, process.env.JWT_SECRET_STRING, {
    expiresIn: `${process.env.JWT_EXPIRES_IN}`,
  });
  return token;
};

// ============ PROTECT MIDDLEWARE ====================
exports.protect = catchAsync(async (req, res, next) => {
  let token;
  //1. GETTING TOKEN AND CHECK OF ITS THERE
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  // console.log('TOKEN:', token);
  if (!token) {
    return next(new AppError('You are not logged in', 401));
  }

  //2. VERIFYING THE TOKEN
  const decoded = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET_STRING
  );
  // console.log(decoded);
  //3. check if user still exists
  const user = await User.findById(decoded._id);
  if (!user) {
    return next(
      new AppError(
        'The user belonging to this token does no longer exists',
        401
      )
    );
  }

  // 4. check if user changed password after token was issued
  if (user.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password! please login again', 401)
    );
  }
  req.user = user;
  next();
});

// =============== RESTRICT TO MIDDLEWARE =====================
exports.restrictTo = (role) => {
  return (req, res, next) => {
    //roles [admin]
    if (req.user.role !== role) {
      return next(
        new AppError("You don't have permission to perform this action", 403)
      );
    }
    next();
  };
};

//=============== SIGNUP MIDDLEWARE =====================
exports.signUp = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);
  createSendToken(newUser._id, 201, res);
});

//=============== LOGIN MIDDLEWARE =====================
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
  createSendToken(user._id, 200, res);
});

//=============== FORGET PASSWORD MIDDLEWARE =====================
exports.forgetPassword = catchAsync(async (req, res, next) => {
  //1. get user based on posted emial
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new AppError('There is no user with this email address', 404));
  }

  //2. generate the random token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  //3. send email reset token link to user mail
  const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/users/resetPassword/${resetToken}`;
  const message = `Forget password? submit a PATCH request with your new password and passwordConfirm to:${resetURL}\nIf you didn't forget your password please ignore this email`;
  try {
    await sendEmail({
      email: user.email,
      subject: `Your password reset Token (valid for 10 minutes)`,
      message,
    });
    res.status(200).json({
      status: 'success',
      message: 'Token sent to email',
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return next(
      new AppError(
        'There was an error in sending the email,try again later',
        500
      )
    );
  }
});

//===============RESET MIDDLEWARE =====================
exports.resetPassword = catchAsync(async (req, res, next) => {
  //1. get user based on token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  //2. If the token has not expired and there is user, then set the new password
  if (!user) {
    return next(new AppError('Token is invalid or Expired', 400));
  }
  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save({ validateBeforeSave: false });

  //3. update changed passwordAt property using pre middleware in the userModel.js
  //4. log user in, send JWT
  signToken(user._id, 200, res);
});

//===============IS LOGGED IN MIDDLEWARE =====================
exports.isLoggedIn = async (req, res, next) => {
  try {
    if (req.cookies.jwt) {
      //1. verify token
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET_STRING
      );

      //2. check if user still exist
      const currentUser = await User.findById(decoded._id);
      if (!currentUser) {
        return next();
      }

      //3. check if user changed password after the token was issued
      if (currentUser.changePasswordAfter(decoded.iat)) {
        return next();
      }

      // There is a logged in user
      res.locals.user = currentUser;
      return next();
    }
  } catch (err) {
    return next();
  }

  next();
};
