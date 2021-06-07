const express = require('express');
const productRouter = require('./routes/productRouter');

const app = express();

// GLOBAL MIDDELWARES

// SERVE STATIC FILES
app.use(express.static(__dirname + '/public'));

// root of product route
app.use('/api/v1/products', productRouter);

app.use((req, res) => {
  res.end('<h1>Page note found</h1>');
});

module.exports = app;
