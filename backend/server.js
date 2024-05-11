require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const todoRoutes = require("./routes/todo")
const userRoutes = require("./routes/user");
const cors = require("cors");


const app = express();
app.use(cors());

mongoose
  .connect(process.env.DB_URL, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log("Error connecting to TaskManagement database", err.message);
    process.exit(1);
  });

// CORS HEADERS MIDDLEWARE
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token, _id");

  res.header(
      'Access-Control-Expose-Headers',
      'x-access-token, x-refresh-token'
  );

  next();
});
// Middlewares
app.use(express.json());
app.use('/', todoRoutes);
app.use('/',userRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
