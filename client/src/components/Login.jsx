import React, { useState } from "react";
import '../stylesheets/signup.css'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';


const Login = () => {

  const Warn=(msg)=> toast.warning(msg);
  const Err=(msg)=> toast.error(msg);
  const succ=(msg)=> toast.success(msg);

 const navigate = useNavigate();

 const [formData,setFormData] = useState({
    email:"",
    pwd:"",
    otp:""
  });

  const handleChange=(e)=>{
    setFormData({...formData , [e.target.name]:e.target.value});
  }

  
  const [isSendingOtp,setIsSendingOtp] = useState(false);

  const handleGetOtp=async()=>{
    
    const e_mail = formData.email;
    const baseURL = process.env.REACT_APP_BaseURL;
    
    try {
        setIsSendingOtp(true)
        const response = await fetch(`${baseURL}/user/send_otp`,{
        method:'POST',
        credentials:'include',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({'email':e_mail})
      })

      const res = await response.json();

      if(res.msg === 'OTP_sent'){
        succ('OTP Sent Succsessfuly');
        Warn('Check Spam section if Needed')
      }else if(res.msg === 'invalid user'){
        Err('Invalid User');
        Warn('Signup First');
      }else if(res.msg="limitOtp"){
        Warn("OTP alredy sent");
        Warn(` wait for ${res.timeLeft} seconds`)
      }else{
        Err('Something went wrong');
        Warn('try to login with password');
      }
    } catch (error) {
        Err('Something went wrong');        
    }finally{
      setIsSendingOtp(false);
    }
  
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
        Warn("Your Account has been Restricted 📱Support : 9510502422 📞 ")
      }else if(res.msg === 'invalid user'){
        Err('Invalid User');
        Warn('Signup First');
      }else if(res.msg === "error occured"){
        Warn("invalid email or password")
      }else if (res.msg === "error occured otp"){
        Warn("Invalid or Expired OTP")
      }else if(res.msg === "use OTPorPWD"){
        Warn("Use OTP or Password For Login")
      }

    } catch (error) {
      Err("Something Went wrong . . .");
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

          <button style={{width:'40%'}} type="button" onClick={handleGetOtp}>Get Otp</button>

          {/* <label htmlFor="password">OTP</label> */}
          <input type="text" inputMode="numeric" pattern="\d{6}" maxLength={6} onChange={handleChange} className="input_otp" name="otp" placeholder="Enter OTP ( Check Spam box)"/>
          
          { isSendingOtp?<><span className="loaderOTP"></span><p style={{'textAlign':'center'}}> Sending OTP</p></>:""}

          <b align='center'>Or use password</b>

          {/* <label htmlFor="password">Password</label> */}
          <input type="password" onChange={handleChange} name="pwd" placeholder="Enter password" />


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
