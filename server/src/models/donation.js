import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const DonationSchema =Schema({
    fullName: {
        type: String,
    },
    email: {
        type: String,
    },
    description: {
        type: String,
    },
    category: {
        type: String,
    },
    number: {
        type: String,
    },
    quantity: {
        type: String,
    },
    orderInfo: [{
        type: mongoose.Schema.Types.ObjectId,
        // required:true,
        ref: 'Booking'
    }],
    bookDates: {
        type:Object,  
    },
    location: {
        type: String,
    },
    portfolioImages: {
        type: Array,
    },
    ratingPercent: {
        type: String,
        default:'100'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        // required:true,
        ref: 'User'
    },
});

export const Donation = mongoose.model('Donation', DonationSchema);