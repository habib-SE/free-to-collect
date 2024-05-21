
import cloudinary from "../config/config.js";
import { Donation } from "../models/donation.js";


// Create a new donation
export const newDonation = async (req, res) => {
    try {
        let uploadedImages = [];

        if (req.files && req.files['portfolioImages']) {
            uploadedImages = await Promise.all(
                req.files['portfolioImages'].map(async (file) => {
                    const result = await cloudinary.uploader.upload(file.path, {
                        folder: 'home',
                    });
                    return result.secure_url;
                })
            );
        }
        const serviceData = {
            ...req.body,
            portfolioImages: uploadedImages,
        };

        const newService = new Donation(serviceData);
        const savedService = await newService.save();

        res.status(201).json(savedService);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
// Get all donations
export const getAllDonations = async (req, res) => {
    let filter = {}
    if (req.query.userId) {
      filter = { userId: req.query.userId.split(',') }
    }
    try {
        const donations = await Donation.find(filter).populate("userId").populate("orderInfo");
        res.status(200).json(donations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal donations Error' });
    }
};

// Get a single donation by ID
export const getDonationById = async (req, res) => {
    let filter = {}
    if (req.query.userId) {
      filter = { userId: req.query.userId.split(',') }
    }
    try {
        const service = await Donation.findOne({ id: req.params.id }).populate("userId").populate("orderInfo");
        if (!service) {
            return res.status(404).json({ error: 'donation not found' });
        }
        res.status(200).json(service);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Update a donation by ID
export const updateDonation = async (req, res) => {
    try {
        let uploadedImages = [];

        if (req.files && req.files['portfolioPicturesUrl']) {
            const imagesFiles = req.files['portfolioPicturesUrl'];

            uploadedImages = await Promise.all(
                imagesFiles.map(async (file) => {
                    const result = await cloudinary.uploader.upload(file.path, {
                        folder: 'home',
                    });
                    return result.secure_url;
                })
            );
        }
        const updatedServiceData = {
            ...req.body,
            portfolioPictures: uploadedImages,
        };

        const updatedService = await Donation.findOneAndUpdate(
            { id: req.params.id },
            updatedServiceData,
            { new: true }
        );

        if (!updatedService) {
            return res.status(404).json({ error: 'Service not found' });
        }

        res.status(200).json(updatedService);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Delete a donation by ID
export const deletDonation = async (req, res) => {
    try {
        const deletedService = await Donation.findOneAndDelete({ id: req.params.id });
        if (deletedService) {
            res.send({ message: "donation delete successfully" });
        } else {
            res.send({ message: "donation cannot delete successfully" })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};