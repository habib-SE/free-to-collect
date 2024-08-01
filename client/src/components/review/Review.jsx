import React, { useState, useEffect } from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar, FaUserCircle } from 'react-icons/fa';
import ApiService from '../../api/ApiService';

const Review = () => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');
  const [rating, setRating] = useState(0);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const data = await ApiService.fetchReview();
      if (data && Array.isArray(data.reviews)) {
        setReviews(data.reviews); // Set the fetched reviews data
      } else {
        console.error('Fetched data is not an array:', data);
        setReviews([]); // Set reviews to an empty array in case of unexpected data
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
      setReviews([]); // Set reviews to an empty array in case of error
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    let userData = JSON.parse(localStorage.getItem('userData'));

    if (newReview.trim() && rating && userData?.user?.id) {
      try {
        await ApiService.createReview({ reviewText: newReview, rating, user: userData?.user?.id });
        fetchReviews(); // Refresh reviews after submitting a new one
        setNewReview(''); // Clear the input field
        setRating(0); // Reset rating
      } catch (error) {
        console.error('Error submitting review:', error);
      }
    }
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStars = rating % 1 !== 0 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;

    return (
      <>
        {[...Array(fullStars)].map((_, index) => (
          <FaStar key={index} className="text-yellow-500" />
        ))}
        {halfStars === 1 && <FaStarHalfAlt className="text-yellow-500" />}
        {[...Array(emptyStars)].map((_, index) => (
          <FaRegStar key={index} className="text-yellow-500" />
        ))}
      </>
    );
  };

  return (
    <div className=' bg-slate-900'>
    <div className="max-w-6xl mx-auto p-4 bg-slate-500 shadow-md rounded-lg text-white">
      <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
      <div className="mb-8">
        <form onSubmit={handleReviewSubmit}>
          <textarea
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-800 text-white"
            placeholder="Write your review here..."
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
          ></textarea>
          <input
            type="number"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2 bg-slate-800 text-white"
            placeholder="Rating (1-5)"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            min="1"
            max="5"
          />
          <button
            type="submit"
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.isArray(reviews) && reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="p-4 border rounded-md bg-slate-800">
              <div className="flex items-center mb-2">
                <FaUserCircle className="text-4xl text-purple-500 mr-2" />
                <div>
                  <p className="font-semibold">{review.user.name}</p>
                  <p className="text-sm text-gray-400">{new Date(review.date).toDateString()}</p>
                </div>
              </div>
              <p>{review.reviewText}</p>
              <div className="flex items-center">
                {renderStars(review.rating)}
              </div>
            </div>
          ))
        ) : (
          <p>No reviews available.</p>
        )}
      </div>
    </div>
    </div>
  );
};

export default Review;
