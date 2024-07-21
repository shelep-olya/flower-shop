const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please enter username"],
    },
    photo: {
        data: {
            type: Buffer,
            required: [false, "Please provide product's photo data."],
        },
        contentType: {
            type: String,
            required: [false, "Please provide product's photo content type."],
        }
    },
    email: {
        type: String,
        required: [true, "Please provide email."],
        lowercase: true,
        unique: true,
    },
    password: {
        type:String,
        required: [true, "Please enter password"],
    },
    passwordConfirm: {
        type:String,
        required: [true, "Please enter password"],
        validate: {
            validator: function(el) {
                return el === this.password;
            },
            message: "Passwords are not the same!"
        }
    },
    order: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:  "Order",
    }],
    favourite: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }]
});

userSchema.pre("save", async function(next) {
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
