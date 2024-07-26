const User = require('../models/userModel');
const Order = require('../models/orderModel');
const catchAsync = require('../utils/catchAsync');

exports.createOrder = catchAsync(async(req, res, next) => {
    const user = await User.findById(req.user.id);
    if (!user) {
        return next(new Error('User not found', 404));
    }

    const products = req.body.products; 
    const order = await Order.create({
        products,
        user: user._id 
    });

    res.status(201).send('Order saved successfully');
});

exports.getOrder = catchAsync(async(req, res, next) => {
    const user = await User.findById(req.user.id).populate('order');
    if (!user) {
        return next(new Error('User not found', 404));
    }

    res.render('orders', {
        user: req.user,
        products: user.order 
    });
});
