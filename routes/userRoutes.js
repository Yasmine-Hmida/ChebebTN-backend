const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

// Route for registeration
router.post("/register" , userController.registerUser);

// Route for login
router.post("/login" , userController.loginUser);

module.exports = router;
