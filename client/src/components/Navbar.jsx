import React, { useEffect, useState } from "react";
import { Link,useLocation } from "react-router-dom";
import '../stylesheets/navbar.css'
import Pwa from "./Pwa";

const Navbar=()=>{

  const [isOpen, setIsOpen] = useState(false);

  const [userName,setUserName] = useState('user')

  const handleToggle = () => setIsOpen(!isOpen);
  const handleClose = () => setIsOpen(false);

  const baseURL = process.env.REACT_APP_BaseURL;
  const handleLogout=async()=>{
    // deleting cookie
    await fetch(`${baseURL}/user/logout`,{
            method:"get",
            credentials: 'include',
        });
    // remove session welcome name
    localStorage.setItem("name","user");
    // show login insted logout
    setIslogin(false);
    window.location.reload();
  }

  const [isLogin,setIslogin] = useState(false);
  const location = useLocation(); 

  useEffect(()=>{
    const sName = localStorage.getItem('name');
    if(sName !== "user" && sName !== null ){
        const name = sName.split(/[0-9]/)
        setUserName(name[0]);
          setIslogin(true);
    }
  },[location]) //using to update because navbar is alredy mounted so will not be updated
  
  return (
    <header className="site-header">
      <div className="container header-inner">
        <div className="logo">AI<span>Tools</span></div>
        <p style={{'color':'white','marginRight':'-5vw','fontWeight': '600'}}>Welcome, {userName}</p>

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
            <li><Link className="Link" to="/signup" onClick={handleClose}>Signup</Link></li>
            
            {
              isLogin ?
              <li><Link className="Link" to="/login" onClick={()=>{handleClose(); handleLogout();}  }>Logout</Link></li>
              :
              <li><Link className="Link" to="/login" onClick={handleClose}>Login</Link></li>
            }
          
            <li><Link className="Link" to="/profile" onClick={handleClose}>Profile</Link></li>
            <li>{<Pwa/>}</li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
