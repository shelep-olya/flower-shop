const User = require('../models/userModel');
const Order = require('../models/orderModel');
const catchAsync = require('../utils/catchAsync');
const Product = require('../models/productModel');
const userLayout = "../views/layouts/admin";
exports.addToCart = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.user.id).populate('order');

    if (!user) {
        return next(new AppError('No user found with that ID', 404));
    }

    const productId = req.params.productId;

    if (!Array.isArray(user.order)) {
        user.order = [];
    }

    if (!user.order.includes(productId)) {
        user.order.push(productId);
        await user.save({ validateBeforeSave: false });
    }

  
    res.status(200).redirect("/users/orders");
});
exports.removeFromCart = catchAsync(async (req, res, next) => {
    const userId = req.user.id;
    const productId = req.params.productId;

    await User.findByIdAndUpdate(
        userId,
        { $pull: { order: productId } }, 
        { new: true, runValidators: false } 
    );

    res.status(200).redirect("/auth/products");
});


exports.getOrder = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    if (!user) {
        return next(new Error('User not found', 404));
    }
    const productIds = user.order;

    const products = await Product.find({ '_id': { $in: productIds } });


    res.render('orders', {
        layout: userLayout,
        products,
    });
});
