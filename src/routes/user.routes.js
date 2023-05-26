const express = require("express");

const UserController = require("../controllers/user.controllers");

const router = express.Router();

//to sign up using email or phone
router.post("/register",UserController.register);

//to sign in using email or phone
router.post("/login",UserController.login);

//to reset password
router.put("/resetPassword",UserController.passwordReset);

module.exports = router;