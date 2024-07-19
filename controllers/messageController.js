const Message = require("../models/messageModel");
const catchAsync = require("../utils/catchAsync");

exports.sendMessage = catchAsync(async(req, res) => {
    const {name, email, number, message} = req.body;
    const msg = await Message.create({
        name,
        email,
        number,
        message
    });
    res.status(201).redirect("/");
});