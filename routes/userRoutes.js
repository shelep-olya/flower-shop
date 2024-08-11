const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const orderController = require("../controllers/orderController");
const viewsController = require("../controllers/viewsController");
const router = express.Router();

router.post("/add-to-favourites/:productId", authController.protect, userController.addToFavorites )


router.route("/favourites")
    .get(authController.protect, userController.getFavorites)
    .get(viewsController.getFavouritesPage);

router.route("/me")
    .get(viewsController.getMePage)
    .get(userController.getMe);

router.route("/")
    .get(userController.getUsers);

router.route("/:id")
    .delete(userController.deleteUser);

router.get('/add-to-cart/:productId', authController.protect, orderController.addToCart);
router.delete('/remove-from-cart/:productId', authController.protect, orderController.removeFromCart);
router.get("/orders", authController.protect, orderController.getOrder);
module.exports = router;