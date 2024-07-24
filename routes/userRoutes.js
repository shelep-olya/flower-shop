const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const viewsController = require("../controllers/viewsController");
const router = express.Router();

router.post("/add-to-favorites/:productId", authController.protect, userController.addToFavourites);

router.route("/orders")
    .get(authController.protect, userController.getOrder)
    .get(viewsController.getOrdersPage);

router.route("/favourites")
    .get(authController.protect, userController.getFavorites)
    .get(viewsController.getFavouritesPage);

router.route("/me")
    .get(viewsController.getMePage)
    .get(userController.getMe);

router.route("/")
    .get(userController.getUsers);

router.route("/:id")
    .get(userController.getUser)
    .delete(userController.deleteUser);

module.exports = router;