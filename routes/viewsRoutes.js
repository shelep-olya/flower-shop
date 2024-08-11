const express = require("express");
const viewsController = require("../controllers/viewsController");
const authController = require("../controllers/authController");
const router = express.Router();
router.use(authController.isLoggedIn);
router.get("/", viewsController.getMainPage);
// router.get("/contact", viewsController.getContactPage);
router.get("/about", viewsController.getAboutPage);
router.get("/products", viewsController.getProductsPage);
router.get("/review", viewsController.getReviewPage);
router.get("/user",authController.protect,  viewsController.getUserMainPage);

module.exports = router;