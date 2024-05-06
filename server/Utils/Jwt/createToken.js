const jwt = require("jsonwebtoken");

module.exports.createToken = (userId) => {
  try {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });
  } catch (error) {
    console.log("error creating token", error);
    return false;
  }
};
