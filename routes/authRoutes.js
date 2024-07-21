const express = require("express");
const authController = require("../controllers/authController");
const viewsController = require("../controllers/viewsController");
const router = express.Router();

router.get("/signup", viewsController.getSignUpPage);
router.post("/signup", authController.signUp);

router.get("/login", viewsController.getLoginPage);
router.post("/login", authController.logIn);

module.exports = router;