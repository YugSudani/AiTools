import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../stylesheets/navbar.css'

const Navbar=()=>{

   const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen(!isOpen);
  const handleClose = () => setIsOpen(false);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <div className="logo">AI<span>Tools</span></div>

        <button
          className="menu-toggle"
          aria-label="Toggle menu"
          onClick={handleToggle}
        >
          ☰
        </button>

        <nav className={`nav ${isOpen ? "open" : ""}`}>
          <ul>
            <li><Link className="Link" to="/" onClick={handleClose}>Home</Link></li>
            <li><Link className="Link" to="/summarize" onClick={handleClose}>Summarizer</Link></li>
            <li><Link className="Link" to="/contentWriter" onClick={handleClose}>Content Writer</Link></li>
            <li><Link className="Link" to="/text-img" onClick={handleClose}>Image Generator</Link></li>
            {/* <li><Link className="Link" to="/signup" onClick={handleClose}>Signup</Link></li>
            <li><Link className="Link" to="/login" onClick={handleClose}>Login</Link></li> */}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;