const express = require('express');
const morgan = require('morgan');
const productRouter = require('./routes/productRoutes');
const userRouter = require('./routes/userRoutes');
const globalErrorHandler = require('./controller/errorController');
const AppError = require('./utils/appError');
const app = express();

// GLOBAL MIDDELWARES

// morgan(third party) to log the url and response status
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// SERVE STATIC FILES
app.use(express.static(__dirname + '/public'));
app.use(express.json());

// root of product route
app.use('/api/v1/products', productRouter);
app.use('/api/v1/users', userRouter);

// global  error handler
app.use('*', (req, res, next) => {
  next(new AppError(`can't find ${req.originalUrl} in this server`, 404));
});
app.use(globalErrorHandler);
module.exports = app;
