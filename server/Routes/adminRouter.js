const express = require("express");
const router = express.Router();
const adminController = require("../Controllers/adminController");

router.post("/login", (req, res) => {
  adminController.login(req, res);
});

router.get("/getUser", (req, res) => {
  adminController.getUser(req, res);
});

router.get("/getAllUsers", (req, res) => {
  adminController.getAllUsers(req, res);
});
module.exports = router;
