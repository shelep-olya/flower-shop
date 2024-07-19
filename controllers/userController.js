const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");

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
