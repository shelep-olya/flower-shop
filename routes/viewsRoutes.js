const express = require("express");
const viewsController = require("../controllers/viewsController")
const router = express.Router();

router.get("/", viewsController.getMainPage);
router.get("/contact", viewsController.getContactPage);
router.get("/about", viewsController.getAboutPage);
router.get("/products", viewsController.getProductsPage);
router.get("/review", viewsController.getReviewPage);
router.get("/myAccount", viewsController.getMyAccount);

module.exports = router;