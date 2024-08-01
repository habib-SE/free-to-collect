import express from 'express';
import { submitReview, getReviews } from '../api/review.js';

const router = express.Router();

router.post('/reviews', submitReview);
router.get('/reviews', getReviews);

export default router;
