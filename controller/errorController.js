const AppError = require('./../utils/appError');

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}:${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.message.match(/(["'])(?:(?=(\\?))\2.)*?\1/)[0];
  const message = `Duplicate field value: ${value},please use another value`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const handleJWTerror = () => {
  return new AppError('Invalid token, Please login again', 401);
};

const handleJWTexpiredError = () =>
  new AppError('Your token has Expired, please login again', 401);

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  // check incoming is an Operational error
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.log('ERROR!!', err);
    res.status(500).json({
      status: 'Error',
      message: 'Something went very wrong',
    });
  }
};

module.exports = (err, req, res, next) => {
  // setting status and statusCode for error
  err.status = err.status || 'error';
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = Object.assign(err);
    // make cast error as operational error
    if (error.name === 'CastError') error = handleCastErrorDB(error);
    // make duplicate field error as operational error
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    // make validation error as operational error
    if (error.name === 'ValidationError')
      error = handleValidationErrorDB(error);
    // handle jwt token manupilated error
    if (error.name === 'JsonWebTokenError') error = handleJWTerror();
    // handle expired jwt error
    if (error.name === 'TokenExpiredError') error = handleJWTexpiredError();
    sendErrorProd(error, res);
  }
};
