const express = require('express');
const router = express.Router();
const usermodel = require("../models/usermodel");
const { getUser } = require("../services/userMap");
const bcrypt = require('bcrypt');



router.get('/getUserInfo' , async (req,res)=>{
    const user = getUser(req.cookies.UID);
    const email = user.email;
    try {   
        const userData = await usermodel.findOne({email});
        res.json({msg:'ok', user:userData});
    } catch (error) {
        res.json({msg:'error_Fetching_data'});
    }
});

router.post('/resetPWD', async (req,res)=>{
    const user = getUser(req.cookies.UID);
    if(!user) return res.json({msg:'notLogin'})
    const email = user.email;
    const { oldPwd , newPwd } = req.body;
    if(!oldPwd || !newPwd) return res.json({msg:'error'});

    const oldPWD_db = await usermodel.findOne({email},{pwd:1,_id:0});
    const isPwdMatch = await bcrypt.compare(oldPwd,oldPWD_db.pwd)
    
    const newPwdHash = await bcrypt.hash(newPwd,11);
    if(isPwdMatch){
        try {
            await usermodel.updateOne(
                {email},
                {
                    $set :{ pwd:newPwdHash }
                }            
            )
            return res.json({msg:'ok'});
        }catch (error) {
            return res.json({msg:'error'});
        }
    }else{
        res.json({msg:'falsePWD'})
    }
});


router.get("/getHistory", async(req,res)=>{

    const user = getUser(req.cookies.UID);
    if(!user) return res.json({msg:'error'});
    const email = user.email;

    try {
        const histData = await usermodel.findOne({email},{searchHistory:1,_id:0});
        // console.log(histData.searchHistory);
        if(histData){
            return res.json({msg:'ok',histData:histData});
        }else{
            return res.json({msg:'error'});
        }    
    } catch (error) {
        return res.json({msg:'error'});
    }
    

});


module.exports = router;