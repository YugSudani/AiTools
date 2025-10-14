import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.OTP_Email_ID,
    pass: process.env.OTP_Email_pwd
  },
});


// service:'gmail',
// auth:{
//     user:process.env.OTP_Email_ID,
//     pass:process.env.OTP_Email_pwd
// }