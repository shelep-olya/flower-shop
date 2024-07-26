const Product = require("../models/productModel");
const catchAsync = require("../utils/catchAsync");

exports.getMainPage = (req, res) => {
    res.status(200).render("index", {
        user: res.locals.user,
    });
};

exports.getContactPage = (req, res) => {
    res.status(200).render("contact", {
        user:res.locals.user, 
    });
};

exports.getAboutPage = (req, res) => {
    res.status(200).render("about", {
        user:res.locals.user,
    });
};

exports.getProductsPage = catchAsync(async (req, res) => {
    const products = await Product.find();
    res.status(200).render("products", {
        user: res.locals.user,
        products
    });
});

exports.getReviewPage = (req, res) => {
    res.status(200).render("review", {
        user: res.locals.user 
    });
};

exports.getMePage = (req, res) => {
    res.status(200).render("me", {
        user: res.locals.user 
    });
};

exports.getLoginPage = (req, res) => {
    res.status(200).render("login", {user:res.locals.user});
};

exports.getSignUpPage = (req, res) => {
    res.status(200).render("signup", {user:res.locals.user});
};

exports.getFavouritesPage = (req, res) => {
    res.status(200).render("favourites", {user:res.locals.user});
};

exports.getOrdersPage = (req, res) => {
    res.status(200).render("orders", {user:res.locals.user});
};