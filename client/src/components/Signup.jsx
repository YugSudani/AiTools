import React from "react";
import '../stylesheets/signup.css'
import { Link } from "react-router-dom";

const Signup = () => {

  const handleSubmit=()=>{
    alert("This Feature is Currently Under Developement");
  }

  return (
    <main className="signup-page">
      <div className="signup-container">
        <form className="signup-form">
          <h2>Create Account</h2>
          <p className="subtitle">Join AI Tools and unlock the power of AI</p>

          <label htmlFor="name">Full Name</label>
          <input type="text" id="name" placeholder="Enter your name" required />

          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Enter your email" required />

          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Enter password" required />

          <label htmlFor="confirm">Confirm Password</label>
          <input type="password" id="confirm" placeholder="Confirm password" required />

          <button type="submit" onClick={handleSubmit}>Sign Up</button>

          <p className="login-link">
            Already have an account?  <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default Signup;
