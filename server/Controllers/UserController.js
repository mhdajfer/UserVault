const UserModel = require("../Models/User");
const bcrypt = require("bcrypt");
const { createToken } = require("../Utils/Jwt/createToken");
const jwt = require("jsonwebtoken");

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


    if (user?.admin) {
      return res.json({
        success: false,
        message: "this is not a user account",
      });
    }

    const isSame = await bcrypt.compare(password, user.password);

    // const isSame = password === user.password ? true : false;

    if (isSame) {
      //create token
      const token = createToken(user?._id);
      if (!token)
        return res.json({
          success: false,
          messsage: "Internal server error-token",
        });
      return (
        res
          // .setHeader("Authorization", `Bearer ${token}`)
          .json({
            success: true,
            message: "User successfully Logged in",
            token: token,
            user: user,
          })
      );
    } else
      res.status(200).json({ success: false, message: "Invalid password" });
  } catch (error) {
    console.log("Error while logging in: " + error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.signup = async (req, res) => {
  const { firstName, lastName, email, password, phone, age } = req.body;
  console.log(req.body);

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

exports.getUser = async (req, res) => {
  const { token } = req.cookies;

  if (!token) return res.json({ success: false, message: "not authenticated" });

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const userData = await UserModel.findOne({ _id: user.id });

    res.status(200).json({ success: true, user: userData });
  } catch (error) {
    console.log("error while getting user", error);
    res.json({ success: false, message: "Internal error " });
  }
};

exports.editUser = async (req, res) => {
  const { token } = req.cookies;
  const profileData = req.body;

  if (!token) return res.json({ success: false, message: "not authenticated" });

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const userUpdated = await UserModel.updateOne(
      { _id: user.id },
      profileData
    );

    if (userUpdated)
      return res
        .status(200)
        .json({ success: true, message: "Updated User Profile" });
    else
      return res.json({
        success: false,
        message: "Not update, try again later!!",
      });
  } catch (error) {
    console.log("error while updating user", error);
    return res.json({ success: false, message: "Internal Server Error" });
  }
};

exports.uploadImage = async (req, res) => {
  const { url } = req.body;
  const { token } = req.cookies;

  if (!token) return res.json({ success: false, message: "not authenticated" });

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const imageUploaded = await UserModel.updateOne(
      { _id: user.id },
      { image: url }
    );
    if (imageUploaded)
      return res
        .status(200)
        .json({ success: true, message: "image uploaded successfully" });
    else return res.json({ success: false, message: "image not uploaded" });
  } catch (error) {
    console.log("error while uploading image", error);
    return res.json({ success: false, message: "Internal Server Error" });
  }
};
