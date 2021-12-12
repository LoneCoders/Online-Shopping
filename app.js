const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');
const productRouter = require('./routes/productRoutes');
const userRouter = require('./routes/userRoutes');
const viewRouter = require('./routes/viewRoutes');
const globalErrorHandler = require('./controller/errorController');
const AppError = require('./utils/appError');
const app = express();

// set view engine
app.set('view engine', 'pug');

// define path for views
app.set('views', path.join(__dirname, 'views'));

// GLOBAL MIDDELWARES
app.use((req, res, next) => {
  // console.log(req.headers);
  next();
});

// morgan(third party) to log the url and response status
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// SERVE STATIC FILES
app.use(express.static(path.join(__dirname, 'public')));

// parse json
app.use(express.json());
app.use(cookieParser());

// root of product route
app.use('/', viewRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/users', userRouter);

// global  error handler
app.use('*', (req, res, next) => {
  next(new AppError(`can't find ${req.originalUrl} in this server`, 404));
});
app.use(globalErrorHandler);
module.exports = app;
