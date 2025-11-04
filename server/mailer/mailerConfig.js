// import nodemailer from 'nodemailer';

// export const transporter = nodemailer.createTransport({
//   service: 'SendGrid',
//   auth: {
//     user: 'apikey', 
//     pass: process.env.SENDGRID_API_KEY
//   }
// });
import nodemailer from 'nodemailer';
import sgTransport from 'nodemailer-sendgrid-transport';

export const transporter = nodemailer.createTransport(sgTransport({
  auth: {
    api_key: process.env.SENDGRID_API_KEY
  }
}));
