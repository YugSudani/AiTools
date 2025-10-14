import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  service: 'SendGrid',
  auth: {
    user: 'apikey', // literally the string 'apikey'
    pass: process.env.SENDGRID_API_KEY
  }
});
