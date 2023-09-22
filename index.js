const express = require("express");
const { mongoConnect } = require("./forDb");
const PORT = process.env.PORT || 3000;
const app = express();
const logicBot = require("./logic");
require("dotenv").config();
const startServer = async () => {
  await mongoConnect();
  app.listen(PORT, () => {
    console.log("Server woke up");
  });
};
startServer();
