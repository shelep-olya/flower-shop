const express = require("express");
const userController = require("../controllers/userController");
const viewsController = require("../controllers/viewsController");
const router = express.Router();

router.route("/favourites/:id")
    .get(userController.getAllProductsOfOne)
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