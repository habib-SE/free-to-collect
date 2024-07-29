import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendResetPasswordEmail = (email, token) => {
  const resetLink = `http://localhost:5000/reset-password/${token}`;
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Password Reset',
    html: `<p>You requested a password reset, please use this <a href="${resetLink}">link</a> to reset your password</p>`,
  };
  return transporter.sendMail(mailOptions);
};
export default sendResetPasswordEmail;