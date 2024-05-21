import { Booking } from '../models/booking.js'
import { Donation } from '../models/donation.js'

// Create a new booking

export const newBooking = async (req, res) => {
    try {
        // Create a new booking
        const booking = new Booking(req.body.guestInfo);
        await booking.save();

        // Update the Donation document with the booking _id
            const updatedService = await Donation.findOneAndUpdate(
                { _id: req.body.serviceId }, 
                { 
                    $push: { orderInfo: booking._id },
                    $set: { bookDates: req.body.bookingDates }
                },
                { new: true }
            );
            console.log("updatedService :  ",updatedService)
        if (!updatedService) {
            return res.status(404).send('Donation not found');
        }

        res.status(201).send(booking);
    } catch (error) {
        res.status(400).send(error);
    }
};


// Get all bookings
export const getAllBooking = async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.send(bookings);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Get a booking by ID
export const getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).send();
        }
        res.send(booking);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update a booking by ID
export const updateBooking = async (req, res) => {
    try {
        const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!booking) {
            return res.status(404).send();
        }
        res.send(booking);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Delete a booking by ID
export const deleteBooking = async (req, res) => {
    try {
        const booking = await Booking.findOneAndDelete({ id: req.params.id });
        if (booking) {
            res.send({ message: "Booking deleted successfully" });
        } else {
            res.send({ message: "Booking not found or could not be deleted" });
        }
    } catch (error) {
        res.status(500).send(error);
    }
};

