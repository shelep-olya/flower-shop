const Product = require("../models/productModel");
const catchAsync = require("../utils/catchAsync");
const basicLayout = '../views/layouts/main';
const userLayout = "../views/layouts/admin";

exports.getMainPage = (req, res) => {
    res.status(200).render("index", {layout: basicLayout});
};
exports.getUserMainPage = (req, res) => {
    res.status(200).render("index_user", {layout: userLayout});
};

exports.getContactPage = (req, res) => {
    res.status(200).render("contact", {layout: basicLayout});
};

exports.getUserContactPage = (req, res) => {
    res.status(200).render("contact_user",{layout: userLayout});
};

exports.getAboutPage = (req, res) => {
    res.status(200).render("about", {layout: basicLayout});
};

exports.getUserAboutPage = (req, res) => {
    res.status(200).render("about_user", {layout: userLayout});
};

exports.getProductsPage = catchAsync(async (req, res) => {
    const products = await Product.find();
    res.status(200).render("products", {
        layout: basicLayout,
        products
    });
});
exports.getUserProductsPage = catchAsync(async (req, res) => {
    const products = await Product.find();
    res.status(200).render("products_user", {
       layout: userLayout,
       products,
    });
});



exports.getMePage = (req, res) => {
    const user = req.user;
    res.status(200).render("me", {layout: userLayout, user});
};

exports.getLoginPage = (req, res) => {
    res.status(200).render("login", {layout: basicLayout});
};

exports.getSignUpPage = (req, res) => {
    res.status(200).render("signup", {layout: basicLayout});
};

exports.getPaymentPage = (req, res) => {
    res.status(200).render("payment", {layout: userLayout});
}



