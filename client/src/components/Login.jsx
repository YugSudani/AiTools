import React, { useState } from "react";
import '../stylesheets/signup.css'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';


const Login = () => {

  const Warn=(msg)=> toast.warning(msg);
  const Err=(msg)=> toast.error(msg);

 const navigate = useNavigate();

 const [formData,setFormData] = useState({
    email:"",
    pwd:""
  });

  const handleChange=(e)=>{
    setFormData({...formData , [e.target.name]:e.target.value});
  }

  const [isLoading,setIsLoading] = useState(false);
  
  const handleSubmit=async(e)=>{
    e.preventDefault();
    // console.log(formData);

    try {
      setIsLoading(true);
      const baseURL = process.env.REACT_APP_BaseURL;
      const response = await fetch(`${baseURL}/user/login` ,{
        method:"POST",
        credentials:'include',
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(formData)
      })
      
      const res = await response.json();

      if(res.msg === 'ok'){
        // console.log("ok")
        localStorage.setItem("name",formData.email);
        navigate("/");
      }else if(res.msg === "restricted Account found"){
        Warn("Your Account has been Restricted by Admin (📱->Support) ")
      }else if(res.msg === "error occured"){
        Warn("invalid email or password")
      }

    } catch (error) {
      console.log("Some error occured in login");
    }finally{
      setIsLoading(false);
    } 
  }

  return (
    <main className="signup-page">
      <ToastContainer/>
      <div className="signup-container">
        <form onSubmit={handleSubmit} method="post" className="signup-form">
          <h2>Login to Account</h2>
          <p className="subtitle">Join AI Tools and unlock the power of AI</p>

          <label htmlFor="email">Email</label>
          <input type="email" onChange={handleChange} name="email" placeholder="Enter your email" required />

          <label htmlFor="password">Password</label>
          <input type="password" onChange={handleChange} name="pwd" placeholder="Enter password" required />
          
          { isLoading?<><span className="loader"></span><p style={{'textAlign':'center'}}>Processing please Wait</p></>:""}
          <button type="submit">Login</button>

          <p className="login-link">
            Don't have an account? <Link to="/signup">Signup</Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default Login;
