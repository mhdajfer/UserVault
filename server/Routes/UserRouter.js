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

router.post("/edit", (req, res) => {
  UserController.editUser(req, res);
});

router.post('/uploadImage', (req, res) => {
  UserController.uploadImage(req, res);
})

module.exports = router;
