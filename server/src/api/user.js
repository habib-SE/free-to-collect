import express from 'express';
import multer from 'multer';
import jwt from 'jsonwebtoken';
// import bcrypt from "bcryptjs";
import bcrypt from "bcrypt";
import cloudinary from "../config/config.js";

import { User } from '../models/user.js';

// const router = express.Router();

export const signup = async (req, res) => {
  console.log(req.files); // Check if files are being received

  const { firstName, lastName, email, password, number, gender, address } = req.body;

  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      number,
      address,
      gender
    });

    const savedUser = await newUser.save();

    res.status(200).json({ message: 'User registered successfully', user: savedUser });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error: error.message });
  }
};



export const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Store user login details in MongoDB (optional)
    user.lastLogin = new Date();
    await user.save();

    const token = jwt.sign(
      { email: user.email, id: user._id },
      "your_secret_key",
      // { expiresIn: "1h" }
    );
    res.status(200).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        number: user.number,
        gender: user.gender,
        address: user.address,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Could not sign in", error: error.message });
  }
};


export const getAllUser = async (req, res) => {
  try {
    const businesses = await User.find();
    res.status(200).json(businesses);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const getById = await User.findById(req.params._id);
    res.status(200).json(getById);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  console.log(req.body)
  try {
    const userId = req.params._id;
    const existingUser = await User.findById(userId);

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const updatedUserData = req.body;
    existingUser.set(updatedUserData);
    await existingUser.save();
    res.status(200).json({ message: "User data updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error: error.message });
  }
};


export const deleteUser = async (req, res) => {
  // console.log(req.params)
  // console.log('name: ', id);
  let data = await User.deleteOne(req.params)
  if (data) {
    res.send({ message: "User data delete successfully" });
  } else {
    res.send({ message: "User data cannot delete successfully" })
  }
}

// export default router;
