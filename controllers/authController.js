const crypto = require("crypto");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel");
const userLayout = "../views/layouts/admin"
const basicLayout = "../views/layouts/main"

const createSendToken = (user, res) => {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });

    res.cookie('jwt', token, {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production'
    });

    user.password = undefined; 

};

exports.signUp = catchAsync(async (req, res, next) => {
    const user = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
    });
    createSendToken(user, res);
    res.render("login", { layout: basicLayout}); 
});


exports.logIn = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new Error('Please provide email and password!', 400));
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return next(new Error('Incorrect email or password', 401));
    }

    createSendToken(user, res);
    res.render("index_user", {layout: userLayout});
});

exports.logout = (req, res) => {
    res.cookie('jwt', 'loggedout', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
    });
    res.redirect("/");
};

exports.protect = catchAsync(async (req, res, next) => {
    let token;
    if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }

    if (!token) {
        return res.render('login');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    try {
        const user = await User.findById(decoded.id);
        req.user = user;
        if (!user) {
            console.log(`User with ID ${decoded.id} not found`);
            return res.render('login'); 
        }
        console.log('User found:', user);
    } catch (error) {
        console.error('Error fetching user:', error);
        return res.render('error', { message: 'Internal Server Error' }); 
    }

    next();
});
exports.isLoggedIn = async (req, res, next) => {
    if (req.cookies.jwt) {
        try {
            const decoded = await promisify(jwt.verify)(
                req.cookies.jwt,
                process.env.JWT_SECRET
            );

            const user = await User.findById(decoded.id);
            if (!user) {
                return next();
            }

            res.locals.user = user;
            return next();
        } catch (err) {
            return next();
        }
    }
    next();
};

exports.setUserInResponseLocals = (req, res, next) => {
    res.locals.user = req.user;
    next();
};