const isAutheticated = (req, res, next) => {
    res.locals.userAuthenticated = !!req.user;
    next();
};
module.exports = isAutheticated;
