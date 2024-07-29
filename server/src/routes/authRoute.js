// authRoutes.js
import express from 'express';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import sendResetPasswordEmail from '../api/mailer.js';
import { User } from '../models/user.js';

const router = express.Router();

router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User with this email does not exist' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    await sendResetPasswordEmail(email, token);
    res.status(200).json({ message: 'Password reset instructions have been sent to your email' });
  } catch (error) {
    res.status(500).json({ message: 'Server error, please try again later' });
  }
});

router.post('/forgot-password', async (req, res) => {
  const { token, newPassword } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(400).json({ message: 'Invalid token or user does not exist' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();
    res.status(200).json({ message: 'Password has been reset successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error, please try again later' });
  }
});

export default router;
