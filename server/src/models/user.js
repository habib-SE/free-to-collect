import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    number: {
        type: String,
    },
    gender: {
        type: String  
    },
    is_donar: {
        type: Boolean  
    },
    address: {
        street: String,
        number: String,
        city: String,
        zip: String,
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

export const User = mongoose.models.User || mongoose.model('User', UserSchema);
