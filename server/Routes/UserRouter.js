const express = require("express");
const router = express.Router();
const UserController = require("../Controllers/UserController");

router.post("/login", (req, res) => {
  UserController.login(req, res);
});

router.post("/signup", (req, res) => {
  UserController.signup(req, res);
});

router.get("/getUser", (req, res) => {
  UserController.getUser(req, res);
});

module.exports = router;
