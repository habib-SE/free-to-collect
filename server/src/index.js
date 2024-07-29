import './config/config.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import Auth from './routes/user-route.js';
import Donation from './routes/donate-route.js';
import Booking from './routes/booking-route.js';
import { User } from './models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import modRewrite from 'connect-modrewrite'

dotenv.config();

const app = express();

// Middlewares
app.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.json());

// Rewrite rules
const rules = [
  '^/reset-password/(.*)$ /reset-password.html [L]', // Rewrite to the desired destination
  // Add more rewrite rules as needed
];

// Apply the rewrite rules
app.use(modRewrite(rules));

// Routes
app.use('/api', Auth);
app.use('/api', Donation);
app.use('/api', Booking);

// Forgot Password Route
app.post('/api/forgot-password', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User with this email does not exist' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Reset your password',
      text: `Please use the following link to reset your password: http://localhost:5173/reset-password/${token}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error sending email' });
      } else {
        return res.status(200).json({ message: 'Password reset link sent successfully' });
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error, please try again later' });
  }
});

// Reset Password Route
app.post('/api/reset-password/:id/:token', async (req, res) => {
  const {id, token } = req.params;
  const { password } = req.body;

  try {
    const decoded = jwt.verify(id,token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(400).json({ message: 'Invalid token or user does not exist' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({ message: 'Password has been reset successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error, please try again later' });
  }
});

// Handle invalid routes
app.use('*', (req, res) => {
  return res.status(404).json({
    success: false,
    message: 'API endpoint doesn\'t exist. Please check your routes.',
  });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
