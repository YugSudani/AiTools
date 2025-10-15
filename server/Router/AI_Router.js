const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const AImodelbaseURL = process.env.AImodelbaseURL;
const huggingfaceToken = process.env.huggingfaceToken 

const { getUser } = require("../services/userMap");
const usermodel = require("../models/usermodel");

router.post("/summarizeText", async(req,res)=>{
    //console.log("Provide input to summarize");
    const text = req.body.text
    
    // check in enough token , deducting token and storing history 
    const user = getUser(req.cookies.UID);
    const email = user.email;
    try {
        const responce = await usermodel.findOneAndUpdate(
                            {email , tokens : { $gte:2 } },
                            {
                                $inc :{ tokens: -2 },
                                $push:{ searchHistory: `Summary : ${text}`}
                            },
                            { new:true }
                        );
            if(!responce){
                return res.json({msg:'noEnough_Tokens'})
            }
    } catch (error) {
        console.log("Error while maintaining History"+ error);
    }
    
    
    
    const prompt = {
        "messages": [
            {
                "role": "user",
                "content": `"summerize this text in minimal lines -> ${text}"`
            }
        ],
        "model": "deepseek-ai/DeepSeek-V3.1-Terminus:novita"
    }

    const AIresponse = await fetch(AImodelbaseURL,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${huggingfaceToken}`
        },

        body:JSON.stringify(prompt)
    })

    const resp_ = await AIresponse.json();

    if(resp_){
        res.json({status:"ok" , output_summary:resp_});
        // console.log("AI responce ____________________ : "+resp_);
    }else{
        res.json({status:"fail" , output_summary:"Invalid operation"})
    }

})



router.post("/createContent" , async (req,res)=>{
    //console.log("provide text to generate content");
    const text = req.body.text;
    
    // check in enough token , deducting token and storing history 
    const user = getUser(req.cookies.UID);
    const email = user.email;
    try {
        const responce = await usermodel.findOneAndUpdate(
                            {email , tokens : { $gte:2 } },
                            {
                                $inc :{ tokens: -2 },
                                $push:{ searchHistory: `Content : ${text}`}
                            },
                            { new:true }
                        );
            if(!responce){
                return res.json({msg:'noEnough_Tokens'})
            }
    } catch (error) {
        console.log("Error while maintaining History");
    }



    const prompt = {
        "messages": [
            {
                "role": "user",
                "content": `"provide content creation ideas from this text in minimal lines -> ${text}"`
            }
        ],
        "model": "deepseek-ai/DeepSeek-V3.1-Terminus:novita"
    }
    
    const AIresponse = await fetch(AImodelbaseURL,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${huggingfaceToken}`
        },
        body:JSON.stringify(prompt)
    })

    const resp_ = await AIresponse.json();

    if(resp_){
        res.json({status:"ok" , output_contentText:resp_});
        // console.log("AI responce ____________________ : "+resp_);
    }else{
        res.json({status:"fail" , output_contentText:"Invalid operation"})
    }

})




router.post("/textToImg" , async (req,res)=>{
    //console.log("Provide img file to convert in text");
    const text = req.body.txt;

    // check in enough token , deducting token and storing history 
    const user = getUser(req.cookies.UID);
    const email = user.email;
    try {
        const responce = await usermodel.findOneAndUpdate(
                            {email , tokens : { $gte:5 } },
                            {
                                $inc :{ tokens:-5 },
                                $push:{ searchHistory: `Image : ${text}`}
                            },
                            { new:true }
                        );
            if(!responce){
                return res.json({msg:'noEnough_Tokens'})
            }
    } catch (error) {
        console.log("Error while maintaining History");
    }
    

    const prompt_ = {     
        sync_mode: true,
        prompt: `"\"generate image -> ${text}\""`, 
    }

    
    const AIresponse = await fetch("https://router.huggingface.co/fal-ai/fal-ai/fast-sdxl",{
    method:"POST",
    headers:{
        "Content-Type":"application/json",
        "Authorization":`Bearer ${huggingfaceToken}`
    },
    body:JSON.stringify(prompt_)
})


    const resp_ = await AIresponse.json();

    if(resp_){
        res.json({status:"ok" , output_contentText:resp_});
        //console.log("AI responce ____________________ : "+resp_);
    }else{
        res.json({status:"fail" , output_contentText:"Invalid operation"})
    }

})

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
    }
});


module.exports = router;