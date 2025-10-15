import React, { useState } from "react";
import '../stylesheets/signup.css'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Signup = () => {

  const navigate = useNavigate();

  const [formData,setFormData] = useState({
    name:"",
    email:"",
    pwd:"",
    cpwd:""
  });

  const [msg,setMsg] = useState(null);

  const handleChange=(e)=>{
    setFormData({...formData , [e.target.name]:e.target.value});
  }

  const [isLoading,setIsLoading] = useState(false);

  const handleSubmit=async(e)=>{
    e.preventDefault();
    //console.log(formData);
    if(formData.pwd !== formData.cpwd){
      setMsg("Password & Confirm password not matching");
    }else{
    
    try {
        setMsg(null);
        setIsLoading(true);
        const baseURL = process.env.REACT_APP_BaseURL;
        const response = await fetch(`${baseURL}/user/signup` ,{
              method:"POST",
              credentials:'include',
              headers:{
                "Content-Type":"application/json"
          },
          body:JSON.stringify(formData)
        })
      
            const res = await response.json();

            if(res.status === 'ok'){
              // console.log("ok")
              navigate("/login");
            }else{
              console.log("Something went wrong in signup");
              alert("Something went wrong in signup , try different email");
            }
        } catch (error) {
          console.log("Some error occured in signup");
        }finally{
          setIsLoading(false);
      }
  }
    
  }

  return (
    <main className="signup-page">
      <div className="signup-container">
        <form onSubmit={handleSubmit} method="post" className="signup-form">
          <h2>Create Account</h2>
          <p className="subtitle">Join AI Tools and unlock the power of AI<p style={{color:'green',fontSize:'16px'}}>(Get 55 Free Tokens)</p></p>

          <label htmlFor="name">Full Name</label>
          <input type="text" onChange={handleChange} name="name" placeholder="Enter your name" required />

          <label htmlFor="email">Email</label>
          <input type="email"  onChange={handleChange} name="email" placeholder="Enter your email" required />

          <label htmlFor="password">Password</label>
          <input type="password"  onChange={handleChange} name="pwd" placeholder="Enter password" required />

          <label htmlFor="confirm">Confirm Password</label>
          <input type="password"  onChange={handleChange} name="cpwd" placeholder="Confirm password" required />

          <p style={{'textAlign':'center','color':'red'}}>{msg}</p>
          { isLoading?<><span className="loader"></span><p style={{'textAlign':'center'}}>Processing please Wait</p></>:""}
          <button type="submit">Sign Up</button>
          <p className="login-link">
            Already have an account?  <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default Signup;
