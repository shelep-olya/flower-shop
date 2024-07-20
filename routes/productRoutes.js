const express = require("express");
const productController = require("../controllers/productController");
const viewsController = require("../controllers/viewsController");

const router = express.Router();

router.get('/', viewsController.getProductsPage);

router.route("/")
    .post(productController.upload, productController.createProduct)
    .get(productController.getProducts);


router.route("/:id")
    .get(productController.getProduct)
    .patch(productController.updateProduct)
    .delete(productController.deleteProduct);

module.exports = router;