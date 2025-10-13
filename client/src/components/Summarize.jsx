import React, { useState } from "react";
import "../stylesheets/summarizer.css"
import { ToastContainer, toast } from 'react-toastify';

const Summarize=()=>{

    const Warn=(msg)=> toast.warning(msg);
    const Err=(msg)=> toast.error(msg);

    const [txt,setTxt] = useState(null);
    const [outputSummary,setOutputSummary] = useState('No summary yet. Enter your text and click “Summarize Text” to get started');
    const [loading,setLoading] = useState(false);

    const handleChange=(e)=>{
        setTxt(e.target.value)
    }

    const baseURL = process.env.REACT_APP_BaseURL;

    const handleSubmit=async()=>{
        setLoading(true);
        try {
                const response = await fetch(`${baseURL}/AI/summarizeText`,{
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
                setOutputSummary(res.output_summary.choices[0]?.message.content);
                // console.log(res.output_summary)
            }else if(res.msg === "notLogin"){     // from middleware
                Warn("Login to Proceed");
            }else{
                Err("Something went Wrong");
            }
        } catch (error) {
            setOutputSummary("Error fetching summary");
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
            <div className="app">
            <header className="app-header">
              <h1 className="title">AI Summarizer</h1>
              <p className="subtitle">
                Transform lengthy texts into concise, meaningful summaries using advanced AI technology.
                Perfect for articles, documents, research papers, and more.
              </p>
            </header>

            <main className="grid">
              <section className="card" aria-labelledby="input-title">
                <div className="card-header">
                  <h2 id="input-title" className="card-title">Input text</h2>
                </div>

                <div className="card-body">
                  <label htmlFor="input-text" className="sr-only">Paste your text</label>
                  <textarea
                    id="input-text"
                    className="text-input"
                    placeholder="Paste your text here... (articles, documents, research papers, etc.)"
                    rows="10"
                    onChange={handleChange}
                  ></textarea>

                  <div className="controls">

                    <button onClick={handleSubmit} className="btn btn-primary" type="button" aria-label="Summarize text">
                      <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm8.94 4a8.94 8.94 0 1 1-17.88 0 8.94 8.94 0 0 1 17.88 0zm-9.44 7h1v3h-1v-3zm0-18h1v3h-1V1zM1 11h3v1H1v-1zm19 0h3v1h-3v-1zM4.22 4.22l.7-.7 2.12 2.12-.7.7-2.12-2.12zm12.74 12.74.7-.7 2.12 2.12-.7.7-2.12-2.12zM4.22 19.78l2.12-2.12.7.7-2.12 2.12-.7-.7zm12.74-12.74 2.12-2.12.7.7-2.12 2.12-.7-.7z"/>
                      </svg>
                      <span>Summarize text</span>
                    </button>
                  </div>
                </div>
              </section>

              <section className="card" aria-labelledby="summary-title">
                <div className="card-header">
                  <h2 id="summary-title" className="card-title">Summary</h2>
                </div>

                <div className="card-body">
                  <div className="summary-placeholder" id="summary">
                    {loading ? <h3>Generating...</h3>: <p
                        name="outputSummary"
                        dangerouslySetInnerHTML={{ __html: formatMarkdown(outputSummary) }}
                    />}
                  </div>
                </div>
              </section>
            </main>
          </div>
        </>
    )
    
}

export default Summarize;