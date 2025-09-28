import React from "react";
import '../stylesheets/signup.css'
import { Link } from "react-router-dom";

const Login = () => {


  const handleSubmit=()=>{
    alert("This Feature is Currently Under Developement");
  }

  return (
    <main className="signup-page">
      <div className="signup-container">
        <form className="signup-form">
          <h2>Login to Account</h2>
          <p className="subtitle">Join AI Tools and unlock the power of AI</p>

          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Enter your email" required />

          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Enter password" required />

          <button type="submit" onClick={handleSubmit}>Login</button>

          <p className="login-link">
            Don't have an account? <Link to="/signup">Signup</Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default Login;
