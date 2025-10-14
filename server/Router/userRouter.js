const express = require("express");
const router = express.Router();
const usermodel = require("../models/usermodel");
const { setUser,getUser } = require("../services/userMap");
const bcrypt = require('bcrypt');
const { GenerateOTP } = require('../mailer/GenerateOTP');
const { transporter } = require('../mailer/mailerConfig');

router.post('/signup', async (req,res)=>{
    //console.log("signning up");
    const {name,email,pwd} = req.body;

    const hashedPwd = await bcrypt.hash(pwd,11)

    try {
        const response = await usermodel.create({
            name,
            email,
            pwd:hashedPwd
        });
        res.json({status:"ok", userID:response._id});
    } catch (error) {
        res.status(500).json({status:"error occured"});
    }
});


router.post('/send_otp', async (req,res)=>{
    
    const { email } = req.body;
    
    const user = await usermodel.findOne({ email });
    if(!user){
        return res.status(404).json({msg:'invalid user'})
    }
    try {

        const OTP = GenerateOTP();

        //store otp
        await usermodel.updateOne({email},
            {
                $set:{otp:OTP , otpExpires: Date.now() + 5 * 60 * 1000}
            }
        )

        //send email
        await transporter.sendMail({
            to:email,
            subject:'OTP For AItools',
            html: `
    <p>Dear User,</p>
    <p>Your One-Time Password (OTP) for accessing <strong>AItools</strong> is:</p>
    <h2 style="color:#2e86de;">🔐 ${OTP}</h2>
    <p>This OTP is valid for the next <strong>5 minutes</strong>. Please do not share it with anyone.</p>
    <p>If you did not request this OTP, please ignore this message or contact our support team immediately.</p>
    <br>
    <p>Visit us here : https://aitools-bs8f.onrender.com </p>
    <br>
    <p>Thank you,<br>The AItools Team</p>
  `
        });
        res.json({msg:'OTP_sent'});
    } catch (error) {
        res.json({msg:'failed_to_sent_OTP'})
    }

});

router.post('/login', async (req,res)=>{
   
    const {email,pwd,otp} = req.body;
    try {
        const user = await usermodel.findOne({email});

        if(user){       // if user exist

            if (!pwd && !otp) {
                return res.json({msg:"use OTPorPWD"});
            }


            if(otp != ''){ // login with OTP
                if(!user.otp || user.otp !== otp || Date.now() > user.otpExpires ){        //check expiry
                    return res.json({msg:"error occured otp"})
                }    
            }

            if(pwd != ''){ // login with password
                const isMatch = await bcrypt.compare(pwd,user.pwd) // check password
                if(!isMatch && user.pwd !== R_PWD){        // only if not restricted
                    return res.json({msg:"error occured"})
                }    
            }

                const token = setUser(user);  //this will create & return JWT token  
    
                res.cookie("UID",token,{
                    httpOnly: true,
                    secure: true,  // if deployed over https
                    sameSite: 'None',
                    maxAge: 24 * 60 * 60 * 1000
                });
                res.json({msg:"ok", userID:user._id}); // not findOne but user._id is generating error while user=null
        }
        
    } catch (error) {
        try {  
            const R_PWD = process.env.restrictedAccPassword;
            const user = await usermodel.findOne({
                email:email,
                pwd:R_PWD
            });
                res.json({msg:"restricted Account found"},{user:user._id});
        } catch (error) {
            res.json({msg:"error occured"});
        }
    }
});

router.get('/logout', async (req,res)=>{
    res.clearCookie('UID', {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
    path: '/', // critical!
  });
//   console.log("Logout done");
  res.status(200).send('Logged out');
})

router.head('/pingTest', async(req,res)=>{
    res.status(200).json({msg:'ok'});
})

module.exports = router;
