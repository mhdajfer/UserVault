const express = require("express");
const cors = require("cors");
const ConnectMongoDB = require("./Config/ConnectDB");
require("dotenv").config();
const app = express();

const port = process.env.PORT || 3000;

//connect db
ConnectMongoDB();

app.use(cors());

app.post("/api/login", (req, res) => {
  console.log("req.body");
  res.json({ success: true, message: "Login successful" });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
