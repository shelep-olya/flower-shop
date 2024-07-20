const mongoose = require("mongoose");
const orderSchema = mongoose.Schema({
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    }],
    totalAmount: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
});

orderSchema.pre('save', async function(next) {
    if (!this.isModified('products')) return next();
    await this.populate('products').execPopulate();

    this.totalAmount = this.products.reduce((sum, product) => sum + product.priceWithDiscount, 0);

    next();
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;