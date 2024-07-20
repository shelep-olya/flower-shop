const mongoose = require("mongoose");
const validator = require("validator");

const validatePhoneNumber = function(phone){
    const regex = /^\+?(\d.*){3,}$/;
    return regex.test(phone);
};

const messageSchema = new mongoose.Schema({
    name:{
        type: String,
        lowercase: true,
        required: [true, "Please enter your name."],
    },
    email: {
        type: String,
        required: [true, "Please enter valid email."],
        lowercase: true,
        validate: [validator.isEmail, "Please enter valid email."],
    },
    number:{
        type: String,
        required: [true, "Please enter valid number."],
        validate: {
            validator: validatePhoneNumber,
            message: props => `${props.value} is not a valid phone number.`,
            match: [/^\+?(\d.*){3,}$/, 'Please fill a valid phone number']
        }
        
    },
    message: {
        type: String,
        required: [true, "pleasse enter message."],
    }
});

const Message = new mongoose.model("Message", messageSchema);
module.exports = Message;