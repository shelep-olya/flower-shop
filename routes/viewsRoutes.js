const express = require("express");
const viewsController = require("../controllers/viewsController");
const authController = require("../controllers/authController");
const router = express.Router();
router.use(authController.isLoggedIn);
router.get("/", viewsController.getMainPage);
router.get("/contact", viewsController.getContactPage);
router.get("/about", viewsController.getAboutPage);
router.get("/products", viewsController.getProductsPage);
router.get("/review", viewsController.getReviewPage);

router.get("/auth",authController.protect,  viewsController.getUserMainPage);
router.get("/auth/contact",authController.protect, viewsController.getUserContactPage);
router.get("/auth/about", authController.protect, viewsController.getUserAboutPage);
router.get("/auth/products", authController.protect, viewsController.getUserProductsPage);
router.get("/auth/reviews", authController.protect, viewsController.getUserReviewPage);
router.get("/me", authController.protect, viewsController.getMePage);

module.exports = router;