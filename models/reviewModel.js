const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    review: {
        type: String,
        required: [true, "Please enter your review."],
        maxlength: 50,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "A review must have an author."],
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: [true, "A review must be on a product."],
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: [true, "Please provide rating."]
    },
    avgRating: {
        type: Number,
        default: 0,
    },

});
const calculateAvgRating = async function() {
    const ratings = await this.model.find({}).select('rating');
    const sumRatings = ratings.reduce((sum, review) => sum + review.rating, 0);
    const avgRating = sumRatings / ratings.length;

    this.avgRating = avgRating;
}


reviewSchema.pre("save", async function(next) {
    if(!this.isModified("rating")) return next();
    await calculateAvgRating.call(this);
    next();
});

reviewSchema.pre("findOneAndUpdate", async function(next) {
    const update = this.getUpdate();
    if(update.rating == null) return next();

    const docToUpdate = await this.model.findOne(this.getQuery());
    docToUpdate.rating = update.rating;
    await calculateAvgRating.call(docToUpdate);
    update.avgRating = docToUpdate.avgRating;
    next();
});

const Review = mongoose.model("Review" , reviewSchema);

module.exports = Review;