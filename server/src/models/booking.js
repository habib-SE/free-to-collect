import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const BookingSchema = Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
    },
    phoneNumber: {
        type: String,
    },
    bookingData: {
        hours: String,
        bookedDate: String,
        totalPrice:String,
    },
   
});

export const Booking = mongoose.model('Booking', BookingSchema);