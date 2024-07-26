const express = require("express");
const authController = require("../controllers/authController");
const viewsController = require("../controllers/viewsController");
const router = express.Router();

router.get("/signup", viewsController.getSignUpPage);
router.post("/signup", authController.signUp);

router.get("/login", viewsController.getLoginPage);
router.post("/login", authController.logIn);

router.get('/favourites', authController.protect, viewsController.getFavouritesPage);
router.get('/orders', authController.protect, viewsController.getOrdersPage);

module.exports = router;