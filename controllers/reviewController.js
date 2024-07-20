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
    const review = await Review.create({
        review: req.body.review,
        author: req.body.author,
        product: req.body.product,
        rating: req.body.rating,
    });

    res.status(201).json(review);
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