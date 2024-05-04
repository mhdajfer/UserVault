const mongoose = require("mongoose");

const ConnectMongoDB = () => {
  mongoose
    .connect(process.env.DB_URL)
    .then(() => console.log("Database connection established"))
    .catch((err) => {
      console.log("db connection error :", err);
    });
};

module.exports = ConnectMongoDB;
