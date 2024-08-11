const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const orderController = require("../controllers/orderController");
const viewsController = require("../controllers/viewsController");
const router = express.Router();

router.get("/add-to-favourites/:productId", authController.protect, userController.addToFavorites )

router.get("/remove-from-favorites/:id", authController.protect, userController.removeFromFavorites);
router.route("/favourites")
    .get(authController.protect, userController.getFavorites)
    .get(userController.getFavorites);

router.route("/me")
    .get(viewsController.getMePage)
    .get(userController.getMe);

router.route("/")
    .get(userController.getUsers);

router.route("/:id")
    .delete(userController.deleteUser);

router.get('/add-to-cart/:productId', authController.protect, orderController.addToCart);
router.get('/remove-from-cart/:productId', authController.protect, orderController.removeFromCart);
router.get("/orders", authController.protect, orderController.getOrder);
module.exports = router;