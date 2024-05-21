import express from 'express';

const router = express.Router();

import { newBooking, getAllBooking,getBookingById, updateBooking, deleteBooking  } from '../api/booking.js'; 

// Create a new Booking
router.post('/booking', newBooking);

// Get all Booking
router.get('/bookings', getAllBooking);

// Get a single Booking by ID
router.get('/booking/:_id', getBookingById);

// Update a Booking
router.put('/booking/:_id', updateBooking);

// Delete a Booking by ID
router.delete('/booking/:_id', deleteBooking);


export default router;
