const mongoose = require("mongoose");
const validator = require("validator");

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter product's name."],
    },
    photo: {
        type: String,
        required: [true, "Please provide product's photo."],
        unique: true,
    },
    price: {
        type: Number,
        required: [true, "Please provide product's price."],
    },
    discount: {
        type: Number,
        required: [true, "Please enter product's discount."],
        default: 1,
    },
    priceWithDiscount: {
        type: Number
    }
});
productSchema.pre("save", function(next) {
    this.priceWithDiscount = (this.price * (100 - this.discount)) / 100;
    next();
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;