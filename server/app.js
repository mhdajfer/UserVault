const express = require("express");
const cors = require("cors");
const ConnectMongoDB = require("./Config/ConnectDB");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const UserRouter = require("./Routes/UserRouter");
const adminRouter = require("./Routes/adminRouter");

const app = express();

const port = process.env.PORT || 3000;

//connect db
ConnectMongoDB();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/user", UserRouter);
app.use("/api/admin", adminRouter);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
