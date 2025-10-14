import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.OTP_Email_ID,
        pass:process.env.OTP_Email_pwd
    }
})

