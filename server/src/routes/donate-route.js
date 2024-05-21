import express from 'express';
import multer from 'multer';

const router = express.Router();

import { newDonation, getAllDonations,getDonationById, updateDonation, deletDonation  } from '../api/donation.js'; 

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'home');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
const upload = multer({ storage: storage });

// Create a new donation
router.post('/donation', upload.fields([{ name: 'portfolioImages', maxCount: 10 }]), newDonation);

// Update a donation
router.put('/donation/:_id', upload.fields([{ name: 'portfolioImages', maxCount: 10 }]), updateDonation);

// Get all donations
router.get('/donations', getAllDonations);

// Get a single donation by ID
router.get('/donation/:_id', getDonationById);

// Delete a donation by ID
router.delete('/donation/:_id', deletDonation);


export default router;
