const Product = require("../models/productModel");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");

exports.getMainPage = (req, res) => {
    res.status(200).render("index");
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

exports.getMyAccount = ( req, res) => {
    res.status(200).render("myAccount");
};

exports.getLoginPage = (req, res) => {
    res.status(200).render("login");
};

exports.getSignUpPage = (req, res) => {
    res.status(200).render("signup");
};