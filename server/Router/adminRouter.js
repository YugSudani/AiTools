const express = require('express');
const router = express.Router();

const usermodel = require('../models/usermodel');

router.get('/fetchEntireHistory', async (req,res)=>{

    try {
        const response = await usermodel.find({});
        res.json({msg:'ok',userData:response});
    } catch (error) {
        console.log("error fetching Data at admin");
        res.json({msg:"error fetching Data at admin"})
    }
})


router.post('/restrictUser', async (req,res)=>{

    userEmail = req.body.email;
    const R_PWD = process.env.restrictedAccPassword;
    try {
        await usermodel.updateOne({email:userEmail},
                                  {$set:{pwd:R_PWD}});
        res.json({msg:'ok'});
    } catch (error) {
        console.log("error while restricting user");
        res.json({msg:"error while restricting user"});
    }
})

module.exports = router;