const app = require('./app');
const dotenv = require('dotenv');

// ADD TO ENVIRONMENT VARIABLES
dotenv.config({ path: './config.env' });

// handling uncaughtExceptions
process.on('uncaughtException', (err) => {
  console.log('UncaughtException! Shutting down...');
  console.log(err.name, err.message);
  process.exit();
});

const mongoose = require('mongoose');
const port = 8000 || process.env.PORT;

// CONNECT TO CLOUD DATABASE
const DB = process.env.DB.replace('<PASSWORD>', process.env.DB_PASSWORD);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log('Connected Successfully');
  });

//SERVER START
const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// Handling unhandledRejection
process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
