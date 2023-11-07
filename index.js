const express = require("express");
const { mongoConnect } = require("./forDb");
const PORT = process.env.PORT || 5555;
const app = express();
const cors = require("cors");
const logicBot = require("./logic");
const router = require("./router");
require("dotenv").config();

const startServer = async () => {
  await mongoConnect();
  app.listen(PORT, () => {
    console.log("Server woke up");
  });
};
app.use(cors());
app.use(express.json());
app.use("/", router);
app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).json({ message: err.message });
});

startServer();
