import React, { useState } from "react";
import '../stylesheets/contentWriter.css'
import { ToastContainer, toast } from 'react-toastify';

const ContentCreation=()=>{

    const [txt,setTxt] = useState(null);
    const [output,setOutput] = useState('No content yet. Submit your text to generat Output.');
    const [loading,setLoading] = useState(false);

    const Warn=(msg)=> toast.warning(msg);
    const Err=(msg)=> toast.error(msg);

    const handleChange=(e)=>{
        setTxt(e.target.value)
    }

    const baseURL = process.env.REACT_APP_BaseURL;

    const handleSubmit=async()=>{
        setLoading(true);

        try {
            const response = await fetch(`${baseURL}/AI/createContent`,{
                method:"POST",
                credentials:'include',
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({text:txt})
            });

            const res = await response.json();
            if(res.status === 'ok')
            {
                setOutput(res.output_contentText.choices[0]?.message.content);
                //console.log(res.output_contentText)
            }else if(res.msg === "notLogin"){     // from middleware
                Warn("Login to Proceed");
            }
            else{
                Err("Something went Wrong");
            }
        } catch (error) {
                setOutput("Error fetching summary");
                alert("Currently we have Limited Tokens Ask Admin To Approve Activity    (📱 9510502422 | yugsudani88@gmail.com)");
            }finally{
                setLoading(false);
        }
    }


    function formatMarkdown(text) {
        return text
          // Bold: **text**
          .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")
          // Italic: *text*
          .replace(/\*(.*?)\*/g, "<i>$1</i>")
          // Headings: # Heading
          .replace(/^# (.*$)/gim, "<h1>$1</h1>")
          .replace(/^## (.*$)/gim, "<h2>$1</h2>")
          .replace(/^### (.*$)/gim, "<h3>$1</h3>")
          // Line breaks
          .replace(/\n/g, "<br>");
      }

    return(
        <> 
            <ToastContainer/>
                <main className="container content-section">
                    <h4 className="section-title">📝 AI Content Creation</h4>
                    <p className="section-subtitle">Create content here and let AI do the writing magic.</p>

                    <textarea name="txt" id="input-text" onChange={handleChange} placeholder="Type your idea or prompt here..."></textarea>

                    <button onClick={handleSubmit} id="submit-btn">Send Text</button>

                    <p id="output" className="output-box">
                        {loading ? <h3>Generating...</h3>: <i
                        name="output"
                        dangerouslySetInnerHTML={{ __html: formatMarkdown(output) }}
                        />} 
                    
                    </p>
                </main>
                                                         
        </>
    )
    
}

export default ContentCreation;