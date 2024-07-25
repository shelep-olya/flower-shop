const Product = require("../models/productModel");
const catchAsync = require("../utils/catchAsync");
const authController = require("../controllers/authController");
const adminLayout = "./../views/layouts/admin";
const defaultLayout = "./../views/layouts/main";



exports.getMainPage = (req, res) => {
    let layout = defaultLayout;
    if(res.locals.user){
        layout = adminLayout;
    }
    res.status(200).render("index", {
        layout,
        user: res.locals.user 
    });
};

exports.getContactPage = (req, res) => {
    res.status(200).render("contact");
};

exports.getAboutPage = (req, res) => {
    res.status(200).render("about")
};

exports.getProductsPage = catchAsync(async (req, res) => {
    const products = await Product.find();
    res.status(200).render('products', { products });
});

exports.getReviewPage = (req, res) => {
    res.status(200).render("review");
};

exports.getMePage = (req, res) => {
    res.status(200).render("me");
};

exports.getLoginPage = (req, res) => {
    res.status(200).render("login");
};

exports.getSignUpPage = (req, res) => {
    res.status(200).render("signup");
};

exports.getFavouritesPage = (req, res) => {
    res.status(200).render("favourites");
};

exports.getOrdersPage = (req, res) => {
    res.status(200).render("orders");
};