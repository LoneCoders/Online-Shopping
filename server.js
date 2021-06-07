const app = require('./app');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
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
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
