import Review from "../models/review-model.js";

export const submitReview = async (req, res) => {
  const { reviewText, rating,user } = req.body;

  if (!reviewText || !rating || !user) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newReview = new Review({
      reviewText,
      rating,
      user
    });

    const savedReview = await newReview.save();

    res.status(201).json({ message: "Review submitted successfully", review: savedReview });
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error: error.message });
  }
};

export const getReviews = async (req, res) => {
  const { rating } = req.query;

  try {
    const query = {};
    if (rating) query.rating = rating;

    const reviews = await Review.find(query);

    res.status(200).json({ reviews });
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error: error.message });
  }
};
