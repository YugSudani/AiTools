import React from "react";
import '../stylesheets/Home.css'
import { Link } from "react-router-dom";

const Home=()=>{

    return(
        <>

          <section class="hero">
            <div class="container hero-inner">
              <div class="hero-text">
                <h1>Unlock the Power of <span>AI</span></h1>
                <p>
                  Explore cutting-edge tools that transform your ideas into reality —
                  from summarizing research to generating creative content.
                </p>
                <Link to="/summarize" class="btn btn-primary">Get Started</Link>
              </div>
              <div class="hero-graphic">
                {/* <!-- Placeholder for future image/graphic --> */}
                <div class="graphic-placeholder"></div>
              </div>
            </div>
          </section>

          {/* <!-- Features Section --> */}
          <section class="features container">
            <h2 class="section-title">Our Tools</h2>
            <div class="features-grid">
            {<Link className="link" to="/summarize">
              <div class="feature-card">
                <h3>Summarizer</h3>
                <p>Condense lengthy articles and documents into concise summaries.</p>
              </div>
              </Link>}

              {<Link className="link" to="/contentWriter">
              <div class="feature-card">
                <h3>Content Writer</h3>
                <p>Generate engaging blog posts, essays, and professional copy.</p>
              </div>
              </Link>}

              {<Link className="link" to="/text-img">
              <div class="feature-card">
                <h3>Text To Image</h3>
                <p>Turn your imagination into visuals with AI-powered image generation.</p>
              </div>
              </Link>}
            </div>
          </section>

        </>
    )
}

export default Home;