import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
    // service:'gmail',
    // auth:{
    //     user:process.env.OTP_Email_ID,
    //     pass:process.env.OTP_Email_pwd
    // }
    host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.OTP_Email_ID,
    pass: process.env.OTP_Email_pwd
  }
})

