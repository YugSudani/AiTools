const express = require("express");
const router = express.Router();
const usermodel = require("../models/usermodel");
const  { v4 : uuidv4 } = require('uuid');
const { setUser,getUser } = require("../services/userMap");
const bcrypt = require('bcrypt');

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


router.post('/login', async (req,res)=>{
   
    const {email,pwd} = req.body;
    try {
        const user = await usermodel.findOne({email});
        
        if(user){       // if user exist
            const isMatch = await bcrypt.compare(pwd,user.pwd) // check password
            if(!isMatch) return res.json({msg:"error occured"})

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
            // console.log(user);
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
