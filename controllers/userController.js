const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const adminLayout = "./../views/layouts/admin";
exports.getMe = (req, res, next) => {
    req.params.id = req.user.id;
    next();
};

exports.getFavorites = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.user.id).populate('favourite');
    if (!user) {
        return next(new Error('User not found', 404));
    }

    res.render('favourites', { 
        layout: adminLayout,
        user: req.user,
        products: user.favourite 
    });
});

exports.getOrder = catchAsync(async(req, res) => {
    const user = await User.findById(req.user.id).populate('order');
    if (!user) {
        return next(new Error('User not found', 404));
    }
    res.render('orders', { 
        layout: adminLayout,
        user: req.user,
        products: user.order 
    });

});

exports.addToFavourites = catchAsync(async(req, res) =>{
    const user = await User.findById(req.user.id);
    if(!user){
        return next(new Error('User not found', 404));
    }
    const productId = req.params.productId;
    if(!user.favourite.includes(productId)){
        user.favourite.push(productId);
    }
    await user.save();
    res.status(200).json({
        status: 'success',
        message: 'Product added to favorites',
        data: {
            favourites: user.favourite
        }
    });
})

exports.getUser = catchAsync(async (req, res) => {
    const id = req.params.id;
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
