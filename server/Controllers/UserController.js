const UserModel = require("../Models/User");
const bcrypt = require("bcrypt");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.json({
      success: false,
      message: "please enter your email and password",
    });

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const isSame = await bcrypt.compare(password, user.password);

    if (isSame) {
      return res.json({
        success: true,
        message: "User successfully Logged in",
      });
    } else
      res.status(200).json({ success: false, message: "Invalid password" });
  } catch (error) {
    console.log("Error while logging in: " + error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.signup = async (req, res) => {
  const { firstName, lastName, email, password, phone, age } = req.body;

  if (!firstName || !lastName || !email || !password || !phone || !age)
    return res.json({
      success: false,
      message: "please enter all the details",
    });

  try {
    const existingUser = await UserModel.findOne({ email });

    if (existingUser)
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });

    const userDoc = new UserModel({
      firstName,
      lastName,
      email,
      password,
      phone,
      age,
    });

    await userDoc.save();

    res
      .status(200)
      .json({ success: true, message: "User created successfully" });
  } catch (error) {
    console.log("Error while creating usr: " + error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
