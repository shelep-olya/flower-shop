const express = require("express");
const productController = require("../controllers/productController");
const viewsController = require("../controllers/viewsController");
const orderController = require("../controllers/orderController");
const isAuthenticted = require("../utils/isAuthenticated");


const router = express.Router();

router.get('/', viewsController.getProductsPage);

router.route("/")
    .post(productController.upload, productController.createProduct)
    .get(productController.getProducts);


module.exports = router;