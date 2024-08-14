const Product = require("../models/productModel");
const Review = require("../models/reviewModel");
const catchAsync = require("../utils/catchAsync");

exports.getReview = catchAsync(async(req, res) => {
    const id = req.params.id;
    const review = await Review.find(id);
    res.status(200).json(review);
});

exports.getReviews = catchAsync(async (req, res) => {
    const reviews = await Review.find();
    res.status(200).json(reviews);
});

exports.createReview = catchAsync(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!req.user) {
        return res.status(401).json({ message: 'You must be logged in to post a review.' });
    }
    const review = await Review.create({
        review: req.body.review,
        author: req.user._id,
        product: product,
        rating: req.body.rating,
    });
    res.status(201).redirect(`/auth/${review.product._id}`);
    console.log(req.user);
});

exports.deleteReview = catchAsync(async(req, res) => {
    const id = req.params.id;
    await Review.findByIdAndDelete(id);
    res.status(204).json({message: "successfully deleted."});
});

exports.updateReview = catchAsync(async(req, res) => {
    const id = req.params.id;
    const updatedData = req.body;
    const review = await Review.findById(id);
    if(!review){
        return res.status(404).json({message: "no review found with such id."});
    }

    const updatedReview = await Review.findByIdAndUpdate(id, updatedData, {
        new: true,
        runValidators: true,
    });

    res.status(200).json(updatedReview);

});