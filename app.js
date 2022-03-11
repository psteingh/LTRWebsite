// add express library
const express = require("express");
// cors before port(s)
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const app = express();

// Accessing the path module
const path = require("path");

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./models");

db.mongoose
  .connect(
    process.env.MONGODB_URI,
      { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false }
  )
  .then(() => {
    console.log("app.js.db.mongoose");
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

// routes
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);
require("./routes/ltrlie.routes")(app);

require("./routes/contact.routes")(app);

// if (process.env.NODE_ENV === 'production') {
app.use(express.static(path.join(__dirname, './client/build')));
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, './client/build', 'index.html'));
});

// code for BHSNA only
const hostname = '127.0.0.1';
const port = 3000;
const PORT = process.env.PORT || port;

app.listen(PORT, hostname, () => {
  console.log(`bhsna app.js.app.listen: http://${hostname}:${PORT}/`);
});