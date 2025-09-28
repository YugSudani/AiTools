const express = require('express');
const router = express.Router();

const AImodelbaseURL = process.env.AImodelbaseURL;
const huggingfaceToken = process.env.huggingfaceToken 

router.post("/summarizeText", async(req,res)=>{
    console.log("Provide input to summarize");
    const text = req.body.text
    
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

    resp_ = await AIresponse.json();

    if(resp_){
        res.json({status:"ok" , output_summary:resp_});
        // console.log("AI responce ____________________ : "+resp_);
    }else{
        res.json({status:"fail" , output_summary:"Invalid operation"})
    }

})

router.post("/createContent" , async (req,res)=>{
    console.log("provide text to generate content");
    
    const text = req.body.text;

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


router.post("/ImgToText" , async (req,res)=>{
    console.log("Provide img file to convert in text");

    const txt = req.body.txt;
     console.log("txt :" +txt);

    const prompt_ = {     
        sync_mode: true,
        prompt: `"\"generate image -> ${txt}\""`, 
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
        console.log("AI responce ____________________ : "+resp_);
    }else{
        res.json({status:"fail" , output_contentText:"Invalid operation"})
    }


})



router.post("/ImgToText2" , async (req,res)=>{
    console.log("Provide img file to convert in text");

    const txt = req.body.txt;
     console.log("txt :" +txt);

    const prompt_ = {     response_format: "b64_json",
        prompt: `"\"${txt}\""`,
        model: "stabilityai/stable-diffusion-xl-base-1.0"
    }

    
    const AIresponse = await fetch("https://router.huggingface.co/nscale/v1/images/generations",{
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
        console.log("AI responce ____________________ : "+resp_);
    }else{
        res.json({status:"fail" , output_contentText:"Invalid operation"})
    }


})

router.post("/ImgToText" , async (req,res)=>{
    console.log("Provide audio file to convert in text");
})



router.post("/ImgToText" , async (req,res)=>{
    console.log("Provide audio file to convert in text");
})


module.exports = router;