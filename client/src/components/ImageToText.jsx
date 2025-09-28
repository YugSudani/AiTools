import React, { useState } from "react";
import '../stylesheets/imgText.css'


const ImgToText=()=>{

    const [txt,setTxt] = useState(null);

    const [output,setOutput] = useState(null);
    const [loading,setLoading] = useState(false);

    const handleChange=(e)=>{
        setTxt(e.target.value);
       // console.log(e.target.files[0])
    }

    const baseURL = process.env.REACT_APP_BaseURL;

    const handleSubmit=async()=>{
        setLoading(true);
        try {
                const response = await fetch(`${baseURL}/AI/ImgToText`,{
                    method:"POST",
                    credentials:'include',
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({txt:txt})
                });

                const res = await response.json();
                if(res.status === 'ok')
                {
                    setOutput(res.output_contentText.images[0]?.url); //1
                    // setOutput(res.output_contentText.data[0]?.b64_json); //2
                    console.log(res.output_contentText);
                    // console.log(res.output_contentText)
                }else{
                    alert("Something went wrong");
                }
        } catch (error) {
            setOutput("Error fetching Image");
            alert("Currently we have Limited Tokens Ask Admin To Approve Activity    (📱 9510502422 | yugsudani88@gmail.com) ");
        }finally{
            setLoading(false)
        }
        
    }


    return(
        <>
            <main className="container content-section">
                <h4 className="section-title">🎨 AI Image Generator</h4>
                <p className="section-subtitle">Write your prompt below and generate an image.</p>

                <input type="text" id="prompt" onChange={handleChange} placeholder="Describe the image you want..." />

                <button id="generate-btn" onClick={handleSubmit}>Generate</button>

                <div className="image-box" id="image-box">
                {loading ? <h3>Generating... |  </h3> : null}
                {output ? <img className="placeholder" src={output} alt="" /> : <p> | Generated Image Will be Displayed Here |</p> }
                </div>                
            </main>
                                                        
        </>
    )
    
}

export default ImgToText;