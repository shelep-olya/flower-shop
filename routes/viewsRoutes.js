const express = require("express");
const viewsController = require("../controllers/viewsController");
const authController = require("../controllers/authController");
const isAutheticated = require("../utils/isAuthenticated");
const productController = require("../controllers/productController");
const reviewController = require("../controllers/reviewController");
const orderController = require("../controllers/orderController");
const router = express.Router();


router.get("/payment", viewsController.getPaymentPage);

router.use(authController.isLoggedIn);
router.get("/", viewsController.getMainPage);
router.get("/contact", viewsController.getContactPage);
router.get("/about", viewsController.getAboutPage);
router.get("/products",isAutheticated, viewsController.getProductsPage);

router.get("/auth",authController.protect,  viewsController.getUserMainPage);
router.get("/auth/contact",authController.protect, viewsController.getUserContactPage);
router.get("/auth/about", authController.protect, viewsController.getUserAboutPage);
router.get("/auth/products", authController.protect, viewsController.getUserProductsPage);
router.get("/me", authController.protect, viewsController.getMePage);


router.get("/auth/:id", authController.protect, productController.getUserProduct);
router.get("/:id", isAutheticated, productController.getProduct);
router.post("/:id/addReview", authController.protect, reviewController.createReview);

router.post("/create-payment-intent", orderController.createPayment);

module.exports = router;