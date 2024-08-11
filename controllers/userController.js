const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const userLayout = "../views/layouts/admin";
const Product = require("../models/productModel");

exports.getMe = (req, res, next) => {
    req.params.id = req.user.id;
    next();
};

exports.getFavorites = catchAsync(async (req, res, next) => {
    
    const user = await User.findById(req.user.id).populate('favourite');

    if (!user) {
        return next(new Error('User not found', 404));
    }

    const products = await Product.find({ _id: { $in: user.favourite } });

    if (products.length === 0) {
        return res.status(200).render('favourites', {
            layout: userLayout,
            products: [],
            message: 'No favorites found.'
        });
    }

    res.status(200).render('favourites', {
        layout: userLayout,
        products,
    });
});

exports.removeFromFavorites = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    const productId = req.params.id;

    user.favourite = user.favourite.filter(item => item.toString() !== productId);
    await user.save({ validateBeforeSave: false });

    res.status(200).render("index_user", { layout: userLayout });
});
exports.addToFavorites = catchAsync(async (req, res, next) => {
    const userId = req.user.id;
    const productId = req.params.productId;
    const user = await User.findById(userId);

    await User.findByIdAndUpdate(
        userId,
        { $addToSet: { favourite: productId } }, 
        { new: true, runValidators: false } 
    );

    res.status(200).redirect("/users/favourites");
});

exports.getUser = catchAsync(async (req, res) => {
    const id = req.user.id;
    const user = await User.findById(id);
    res.status(200).json(user);
});

exports.getUsers = catchAsync(async(req, res) => {
    const users = await User.find();
    res.status(200).json(users);
});

exports.deleteUser = catchAsync(async(req, res) => {
    const id = req.params.id;
    await User.findByIdAndDelete(id);
    res.send(204).json({message: "success"});
});
