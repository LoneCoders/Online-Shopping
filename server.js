const app = require('./app');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const port = 8000 || process.env.PORT;
//SERVER START
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
