const express = require("express");
const router = express.Router();
const adminController = require("../Controllers/adminController");

router.post("/login", (req, res) => {
    adminController.login(req, res);
});

module.exports = router;
